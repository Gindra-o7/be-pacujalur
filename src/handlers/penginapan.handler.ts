import { Request, Response } from "express";
import PenginapanService from "../services/penginapan.service";
import ResponseHelper from "../helpers/response.helper";
import PaginationHelper from "../helpers/pagination.helper";
import { CreatePenginapanRequest, UpdatePenginapanRequest } from "../types/penginapan.type";

export default class PenginapanHandler {
  public static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const { page, limit } = PaginationHelper.parsePaginationQuery(req.query);
      
      const result = await PenginapanService.getAll(page, limit);
      
      return ResponseHelper.success(res, result, 'Data penginapan berhasil didapatkan');
    } catch (error) {
      console.error('Error get all data penginapan:', error);
      return ResponseHelper.error(res, 'Gagal mendapatkan data penginapan');
    }
  };

  public static async getById(req: Request, res: Response): Promise<Response>{
    try {
      const { id } = req.params;

      const penginapan = await PenginapanService.getById(id);

      if (!penginapan) {
        return ResponseHelper.notFound(res, 'Penginapan tidak ditemukan');
      }

      return ResponseHelper.success(res, penginapan, 'Data penginapan berhasil didapatkan');
    } catch (error) {
      console.error('Error mendapatkan data penginapan by id:', error);
      return ResponseHelper.error(res, 'Gagal mendapatkan data penginapan');
    }
  };

  public static async push(req: Request, res: Response): Promise<Response>{
    try {
      const data: CreatePenginapanRequest = req.body;

      const penginapan = await PenginapanService.push(data);

      return ResponseHelper.created(res, penginapan, 'Data penginapan berhasil ditambahkan');
    } catch (error) {
      console.error('Error menambahkan data penginapan:', error);
      return ResponseHelper.error(res, 'Gagal menambahkan data penginapan');
    }
  };

  public static async put(req: Request, res: Response): Promise<Response>{
    try {
      const { id } = req.params;
      const data: UpdatePenginapanRequest = req.body;

      if (Object.keys(data).length === 0) {
        return ResponseHelper.badRequest(res, 'Tidak ada data yang diperbarui');
      }

      const updatedPenginapan = await PenginapanService.put(id, data);

      if (!updatedPenginapan) {
        return ResponseHelper.notFound(res, 'Penginapan tidak ditemukan');
      }

      return ResponseHelper.success(res, updatedPenginapan, 'Data penginapan berhasil diperbarui');
    } catch (error) {
      console.error('Error updating penginapan:', error);
      return ResponseHelper.error(res, 'Gagal mengupdate data penginapan');
    }
  };

  public static async delete(req: Request, res: Response): Promise<Response>{
    try {
      const { id } = req.params;

      const deleted = await PenginapanService.delete(id);

      if (!deleted) {
        return ResponseHelper.notFound(res, 'Penginapan tidak ditemukan');
      }

      return ResponseHelper.success(res, null, 'Penginapan berhasil dihapus');
    } catch (error) {
      console.error('Error menghapus penginapan:', error);
      return ResponseHelper.error(res, 'Gagal menghapus data penginapan');
    }
  };
}
