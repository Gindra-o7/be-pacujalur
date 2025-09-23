import db from "../infrastructures/db.infrastructure";
import { Fasilitas, CreateFasilitasRequest, UpdateFasilitasRequest } from "../types/fasilitas.type";

export default class FasilitasRepository {
  public static async findAll(offset: number, limit: number): Promise<{ data: Fasilitas[]; total: number }> {
    const countQuery = "SELECT COUNT(*) as total FROM fasilitas";
    const [countResult]: any = await db.query(countQuery);
    const total = parseInt(countResult[0].total);

    const query = `
      SELECT f.id, f.nama, f.penginapan_id
      FROM fasilitas f
      ORDER BY f.nama
      LIMIT ? OFFSET ?
    `;
    const [result]: any = await db.query(query, [limit, offset]);

    return {
      data: result,
      total,
    };
  }

  public static async findByPenginapanId(penginapanId: string): Promise<Fasilitas[]> {
    const query = `
      SELECT id, nama, penginapan_id
      FROM fasilitas
      WHERE penginapan_id = ?
      ORDER BY nama
    `;
    const [result]: any = await db.query(query, [penginapanId]);
    return result;
  }

  public static async findById(id: string): Promise<Fasilitas | null> {
    const query = `
      SELECT id, nama, penginapan_id
      FROM fasilitas
      WHERE id = ?
    `;
    const [result]: any = await db.query(query, [id]);
    return result[0] || null;
  }

  public static async create(data: CreateFasilitasRequest): Promise<Fasilitas> {
    const query = `
      INSERT INTO fasilitas (nama, penginapan_id)
      VALUES (?, ?)
    `;
    await db.query(query, [data.nama, data.penginapan_id]);
    
    const [created]: any = await db.query("SELECT * FROM fasilitas WHERE id = LAST_INSERT_ID()");
    return created[0];
  }

  public static async update(id: string, data: UpdateFasilitasRequest): Promise<Fasilitas | null> {
    const updates: string[] = [];
    const values: any[] = [];

    if (data.nama !== undefined) {
      updates.push(`nama = ?`);
      values.push(data.nama);
    }
    if (data.penginapan_id !== undefined) {
      updates.push(`penginapan_id = ?`);
      values.push(data.penginapan_id);
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    const query = `
      UPDATE fasilitas
      SET ${updates.join(", ")}
      WHERE id = ?
    `;

    await db.query(query, values);
    return this.findById(id);
  }

  public static async delete(id: string): Promise<boolean> {
    const query = "DELETE FROM fasilitas WHERE id = ?";
    const [result]: any = await db.query(query, [id]);
    return result.affectedRows > 0;
  }

  public static async deleteByPenginapanId(penginapanId: string): Promise<number> {
    const query = "DELETE FROM fasilitas WHERE penginapan_id = ?";
    const [result]: any = await db.query(query, [penginapanId]);
    return result.affectedRows;
  }
}
