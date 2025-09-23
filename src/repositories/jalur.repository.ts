import db from "../infrastructures/db.infrastructure";
import { CreateJalurRequest, Jalur } from "../types/jalur.type";
import { Medsos } from "../types/medsos.type";
import { Galeri } from "../types/galeri.type";
import { PoolConnection } from "mysql2/promise";

export default class JalurRepository {
  public static async findAll(offset: number, limit: number): Promise<{ data: Jalur[]; total: number }> {
    const countQuery = "SELECT COUNT(*) as total FROM jalur";
    const [countResult]: any = await db.query(countQuery);
    const total = parseInt(countResult[0].total);

    const query = `
      SELECT id, nama, desa, kecamatan, kabupaten, provinsi, deskripsi
      FROM jalur
      ORDER BY nama
      LIMIT ? OFFSET ?
    `;
    const [result]: any = await db.query(query, [limit, offset]);

    return {
      data: result,
      total,
    };
  }

  public static async create(data: CreateJalurRequest): Promise<Jalur & { medsos: Medsos[]; galeri: Galeri[] }> {
    const client: PoolConnection = await db.getConnection();
    try {
      await client.beginTransaction();
      const jalurSql = `
            INSERT INTO jalur (nama, desa, kecamatan, kabupaten, provinsi, deskripsi)
            VALUES (?, ?, ?, ?, ?, ?);
        `;
      const jalurParams = [data.nama, data.desa, data.kecamatan, data.kabupaten, data.provinsi, data.deskripsi];
      const [jalurResult]: any = await client.query(jalurSql, jalurParams);
      const jalurId = jalurResult.insertId;
      
      const [getJalur]: any = await client.query("SELECT * FROM jalur WHERE id = ?", [jalurId]);
      const jalurBaru: Jalur = getJalur[0];

      const medsosBaru: Medsos[] = [];
      if (data.medsos && data.medsos.length > 0) {
        for (const item of data.medsos) {
          const medsosSql = `
                    INSERT INTO medsos (media, link, jalur_id)
                    VALUES (?, ?, ?);
                `;
          const medsosParams = [item.media, item.link, jalurId];
          const [medsosResult]: any = await client.query(medsosSql, medsosParams);
          
          const [getMedsos]: any = await client.query("SELECT * FROM medsos WHERE id = ?", [medsosResult.insertId]);
          medsosBaru.push(getMedsos[0]);
        }
      }

      const galeriBaru: Galeri[] = [];
      if (data.galeri && data.galeri.length > 0) {
        for (const item of data.galeri) {
          const galeriSql = `
                    INSERT INTO galeri (image_url, judul, caption, jalur_id)
                    VALUES (?, ?, ?, ?);
                `;
          const galeriParams = [item.image_url, item.judul, item.caption, jalurId];
          const [galeriResult]: any = await client.query(galeriSql, galeriParams);
          
          const [getGaleri]: any = await client.query("SELECT * FROM galeri WHERE id = ?", [galeriResult.insertId]);
          galeriBaru.push(getGaleri[0]);
        }
      }

      await client.commit();

      return { ...jalurBaru, medsos: medsosBaru, galeri: galeriBaru };
    } catch (error) {
      await client.rollback();
      console.error("Transaction ROLLBACK:", error);
      throw error;
    } finally {
      client.release();
    }
  }
}
