import db from "../infrastructures/db.infrastructure";
import { Galeri } from "../types/galeri.type";

export default class GaleriRepository {
  public static async findAll(offset: number, limit: number): Promise<{ data: Galeri[]; total: number }> {
    const countQuery = "SELECT COUNT(*) as total FROM galeri";
    const [countResult]: any = await db.query(countQuery);
    const total = parseInt(countResult[0].total);

    const query = `
      SELECT id, image_url, judul, caption, jalur_id
      FROM galeri
      ORDER BY judul
      LIMIT ? OFFSET ?
    `;
    const [result]: any = await db.query(query, [limit, offset]);

    return {
      data: result,
      total,
    };
  }
}