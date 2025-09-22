import { Request, Response } from "express";
import FasilitasService from "../services/fasilitas.service";
import ResponseHelper from "../helpers/response.helper";
import PaginationHelper from "../helpers/pagination.helper";
import { CreateFasilitasRequest, UpdateFasilitasRequest } from "../types/fasilitas.type";

export default class FasilitasHandler {
  public static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const { page, limit } = PaginationHelper.parsePaginationQuery(req.query);

      const result = await FasilitasService.getAll(page, limit);

      return ResponseHelper.success(res, result, "Data fasilitas berhasil didapatkan");
    } catch (error) {
      console.error("Error mendapatkan data fasilitas:", error);
      return ResponseHelper.error(res, "Gagal mendapatkan data fasilitas");
    }
  }

  public static async getByPenginapanId(req: Request, res: Response): Promise<Response> {
    try {
      const { penginapanId } = req.params;

      const fasilitas = await FasilitasService.getByPenginapanId(penginapanId);

      return ResponseHelper.success(res, fasilitas, "Data fasilitas berhasil didapatkan");
    } catch (error) {
      console.error("Error mendapatkan data fasilitas by id penginapan:", error);
      if (error instanceof Error && error.message === "Penginapan tidak ditemukan") {
        return ResponseHelper.notFound(res, error.message);
      }
      return ResponseHelper.error(res, "Gagal mendapatkan data fasilitas");
    }
  }

  public static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const fasilitas = await FasilitasService.getById(id);

      if (!fasilitas) {
        return ResponseHelper.notFound(res, "Fasilitas tidak ditemukan");
      }

      return ResponseHelper.success(res, fasilitas, "Data fasilitas berhasil didapatkan");
    } catch (error) {
      console.error("Error mendapatkan data fasilitas by id:", error);
      return ResponseHelper.error(res, "Gagal mendapatkan data fasilitas");
    }
  }

  public static async push(req: Request, res: Response): Promise<Response> {
    try {
      const data: CreateFasilitasRequest = req.body;

      const fasilitas = await FasilitasService.push(data);

      return ResponseHelper.created(res, fasilitas, "Fasilitas berhasil ditambahkan");
    } catch (error) {
      console.error("Error menambahkan data fasilitas:", error);
      if (error instanceof Error && error.message === "Penginapan tidak ditemukan") {
        return ResponseHelper.notFound(res, error.message);
      }
      return ResponseHelper.error(res, "Gagal menambahkan data fasilitas");
    }
  }

  public static async put(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const data: UpdateFasilitasRequest = req.body;

      if (Object.keys(data).length === 0) {
        return ResponseHelper.badRequest(res, "Tidak ada data yang diperbarui");
      }

      const updatedFasilitas = await FasilitasService.put(id, data);

      if (!updatedFasilitas) {
        return ResponseHelper.notFound(res, "Fasilitas tidak ditemukan");
      }

      return ResponseHelper.success(res, updatedFasilitas, "Data fasilitas berhasil diperbarui");
    } catch (error) {
      console.error("Error updating fasilitas:", error);
      if (error instanceof Error && error.message === "Penginapan tidak ditemukan") {
        return ResponseHelper.notFound(res, error.message);
      }
      return ResponseHelper.error(res, "Gagal mengupdate data fasilitas");
    }
  }

  public static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const deleted = await FasilitasService.delete(id);

      if (!deleted) {
        return ResponseHelper.notFound(res, "Fasilitas tidak ditemukan");
      }

      return ResponseHelper.success(res, null, "Fasilitas berhasil dihapus");
    } catch (error) {
      console.error("Error menghapus fasilitas:", error);
      return ResponseHelper.error(res, "Gagal menghapus data fasilitas");
    }
  }
}
