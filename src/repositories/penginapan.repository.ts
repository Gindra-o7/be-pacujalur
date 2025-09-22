import db from "../infrastructures/db.infrastructure";
import { Penginapan, CreatePenginapanRequest, UpdatePenginapanRequest } from "../types/penginapan.type";

export default class PenginapanRepository {
  public static async findAll(offset: number, limit: number): Promise<{ data: Penginapan[]; total: number }> {
    const countQuery = 'SELECT COUNT(*) as total FROM penginapan';
    const countResult = await db.query(countQuery);
    const total = parseInt(countResult.rows[0].total);

    const query = `
      SELECT id, nama, tipe, harga, image_url, deskripsi, rating, maps_url
      FROM penginapan
      ORDER BY nama
      LIMIT $1 OFFSET $2
    `;
    const result = await db.query(query, [limit, offset]);

    return {
      data: result.rows,
      total
    };
  }

  public static async findById(id: string): Promise<Penginapan | null> {
    const query = `
      SELECT id, nama, tipe, harga, image_url, deskripsi, rating, maps_url
      FROM penginapan
      WHERE id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  public static async create(data: CreatePenginapanRequest): Promise<Penginapan> {
    const query = `
      INSERT INTO penginapan (nama, tipe, harga, image_url, deskripsi, rating, maps_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, nama, tipe, harga, image_url, deskripsi, rating, maps_url
    `;
    const values = [
      data.nama,
      data.tipe,
      data.harga,
      data.image_url,
      data.deskripsi,
      data.rating,
      data.maps_url
    ];
    
    const result = await db.query(query, values);
    return result.rows[0];
  }

  public static async update(id: string, data: UpdatePenginapanRequest): Promise<Penginapan | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (data.nama !== undefined) {
      updates.push(`nama = $${paramCount++}`);
      values.push(data.nama);
    }
    if (data.tipe !== undefined) {
      updates.push(`tipe = $${paramCount++}`);
      values.push(data.tipe);
    }
    if (data.harga !== undefined) {
      updates.push(`harga = $${paramCount++}`);
      values.push(data.harga);
    }
    if (data.image_url !== undefined) {
      updates.push(`image_url = $${paramCount++}`);
      values.push(data.image_url);
    }
    if (data.deskripsi !== undefined) {
      updates.push(`deskripsi = $${paramCount++}`);
      values.push(data.deskripsi);
    }
    if (data.rating !== undefined) {
      updates.push(`rating = $${paramCount++}`);
      values.push(data.rating);
    }
    if (data.maps_url !== undefined) {
      updates.push(`maps_url = $${paramCount++}`);
      values.push(data.maps_url);
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    const query = `
      UPDATE penginapan
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, nama, tipe, harga, image_url, deskripsi, rating, maps_url
    `;

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  public static async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM penginapan WHERE id = $1';
    const result = await db.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }

  public static async exists(id: string): Promise<boolean> {
    const query = 'SELECT 1 FROM penginapan WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows.length > 0;
  }
}
