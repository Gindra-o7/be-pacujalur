import db from "../infrastructures/db.infrastructure";
import { Penginapan, CreatePenginapanRequest, UpdatePenginapanRequest } from "../types/penginapan.type";

export default class PenginapanRepository {
  public static async findAll(offset: number, limit: number): Promise<{ data: Penginapan[]; total: number }> {
    const countQuery = "SELECT COUNT(*) as total FROM penginapan";
    const [countResult]: any = await db.query(countQuery);
    const total = parseInt(countResult[0].total);

    const query = `
      SELECT id, nama, tipe, harga, image_url, deskripsi, rating, maps_url
      FROM penginapan
      ORDER BY nama
      LIMIT ? OFFSET ?
    `;
    const [result]: any = await db.query(query, [limit, offset]);

    return {
      data: result,
      total,
    };
  }

  public static async findById(id: string): Promise<Penginapan | null> {
    const query = `
      SELECT id, nama, tipe, harga, image_url, deskripsi, rating, maps_url
      FROM penginapan
      WHERE id = ?
    `;
    const [result]: any = await db.query(query, [id]);
    return result[0] || null;
  }

  public static async create(data: CreatePenginapanRequest): Promise<Penginapan> {
    const query = `
      INSERT INTO penginapan (nama, tipe, harga, image_url, deskripsi, rating, maps_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [data.nama, data.tipe, data.harga, data.image_url, data.deskripsi, data.rating, data.maps_url];

    const [result]: any = await db.query(query, values);
    
    const [created]: any = await db.query("SELECT * FROM penginapan WHERE id = ?", [result.insertId]);
    return created[0];
  }

  public static async update(id: string, data: UpdatePenginapanRequest): Promise<Penginapan | null> {
    const updates: string[] = [];
    const values: any[] = [];

    if (data.nama !== undefined) {
      updates.push(`nama = ?`);
      values.push(data.nama);
    }
    if (data.tipe !== undefined) {
      updates.push(`tipe = ?`);
      values.push(data.tipe);
    }
    if (data.harga !== undefined) {
      updates.push(`harga = ?`);
      values.push(data.harga);
    }
    if (data.image_url !== undefined) {
      updates.push(`image_url = ?`);
      values.push(data.image_url);
    }
    if (data.deskripsi !== undefined) {
      updates.push(`deskripsi = ?`);
      values.push(data.deskripsi);
    }
    if (data.rating !== undefined) {
      updates.push(`rating = ?`);
      values.push(data.rating);
    }
    if (data.maps_url !== undefined) {
      updates.push(`maps_url = ?`);
      values.push(data.maps_url);
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    const query = `
      UPDATE penginapan
      SET ${updates.join(", ")}
      WHERE id = ?
    `;

    await db.query(query, values);
    return this.findById(id);
  }

  public static async delete(id: string): Promise<boolean> {
    const query = "DELETE FROM penginapan WHERE id = ?";
    const [result]: any = await db.query(query, [id]);
    return result.affectedRows > 0;
  }

  public static async exists(id: string): Promise<boolean> {
    const query = "SELECT 1 FROM penginapan WHERE id = ?";
    const [result]: any = await db.query(query, [id]);
    return result.length > 0;
  }
}
