import { PoolClient } from "pg";
import db from "../infrastructures/db.infrastructure";
import { CreateJalurRequest, Jalur} from "../types/jalur.type";
import { Medsos } from "../types/medsos.type";
import { Galeri } from "../types/galeri.type";

export default class JalurRepository {
  public static async find(): Promise<Jalur[]> {
    const result = await db.query("SELECT * FROM jalur");
    return result.rows;
  }

  public static async create(data: CreateJalurRequest): Promise<Jalur & { medsos: Medsos[]; galeri: Galeri[] }> {
    const client: PoolClient = await db.connect();
    try {
      await client.query("BEGIN");
      const jalurSql = `
            INSERT INTO jalur (nama, desa, kecamatan, kabupaten, provinsi, deskripsi)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
      const jalurParams = [data.nama, data.desa, data.kecamatan, data.kabupaten, data.provinsi, data.deskripsi];
      const jalurResult = await client.query(jalurSql, jalurParams);
      const jalurBaru: Jalur = jalurResult.rows[0];

      const jalurId = jalurBaru.id;

      const medsosBaru: Medsos[] = [];
      if (data.medsos && data.medsos.length > 0) {
        for (const item of data.medsos) {
          const medsosSql = `
                    INSERT INTO medsos (media, link, jalur_id)
                    VALUES ($1, $2, $3)
                    RETURNING *;
                `;
          const medsosParams = [item.media, item.link, jalurId];
          const medsosResult = await client.query(medsosSql, medsosParams);
          medsosBaru.push(medsosResult.rows[0]);
        }
      }

      const galeriBaru: Galeri[] = [];
      if (data.galeri && data.galeri.length > 0) {
        for (const item of data.galeri) {
          const galeriSql = `
                    INSERT INTO galeri (image_url, judul, caption, jalur_id)
                    VALUES ($1, $2, $3, $4)
                    RETURNING *;
                `;
          const galeriParams = [item.image_url, item.judul, item.caption, jalurId];
          const galeriResult = await client.query(galeriSql, galeriParams);
          galeriBaru.push(galeriResult.rows[0]);
        }
      }

      await client.query("COMMIT");

      return { ...jalurBaru, medsos: medsosBaru, galeri: galeriBaru };
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Transaction ROLLBACK:", error);
      throw error;
    } finally {
      client.release();
    }
  }
}
