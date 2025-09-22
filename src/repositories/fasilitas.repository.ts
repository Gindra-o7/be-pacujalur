import db from "../infrastructures/db.infrastructure";
import { Fasilitas, CreateFasilitasRequest, UpdateFasilitasRequest } from "../types/fasilitas.type";

export default class FasilitasRepository {
  public static async findAll(offset: number, limit: number): Promise<{ data: Fasilitas[]; total: number }> {
    const countQuery = 'SELECT COUNT(*) as total FROM fasilitas';
    const countResult = await db.query(countQuery);
    const total = parseInt(countResult.rows[0].total);

    const query = `
      SELECT f.id, f.nama, f.penginapan_id
      FROM fasilitas f
      ORDER BY f.nama
      LIMIT $1 OFFSET $2
    `;
    const result = await db.query(query, [limit, offset]);

    return {
      data: result.rows,
      total
    };
  }

  public static async findByPenginapanId(penginapanId: string): Promise<Fasilitas[]> {
    const query = `
      SELECT id, nama, penginapan_id
      FROM fasilitas
      WHERE penginapan_id = $1
      ORDER BY nama
    `;
    const result = await db.query(query, [penginapanId]);
    return result.rows;
  }

  public static async findById(id: string): Promise<Fasilitas | null> {
    const query = `
      SELECT id, nama, penginapan_id
      FROM fasilitas
      WHERE id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  public static async create(data: CreateFasilitasRequest): Promise<Fasilitas> {
    const query = `
      INSERT INTO fasilitas (nama, penginapan_id)
      VALUES ($1, $2)
      RETURNING id, nama, penginapan_id
    `;
    const result = await db.query(query, [data.nama, data.penginapan_id]);
    return result.rows[0];
  }

  public static async update(id: string, data: UpdateFasilitasRequest): Promise<Fasilitas | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.nama !== undefined) {
      updates.push(`nama = $${paramCount++}`);
      values.push(data.nama);
    }
    if (data.penginapan_id !== undefined) {
      updates.push(`penginapan_id = $${paramCount++}`);
      values.push(data.penginapan_id);
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    const query = `
      UPDATE fasilitas
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, nama, penginapan_id
    `;

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  public static async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM fasilitas WHERE id = $1';
    const result = await db.query(query, [id]);
    return ( result.rowCount ?? 0) > 0;
  }

  public static async deleteByPenginapanId(penginapanId: string): Promise<number> {
    const query = 'DELETE FROM fasilitas WHERE penginapan_id = $1';
    const result = await db.query(query, [penginapanId]);
    return result.rowCount ?? 0;
  }
}
