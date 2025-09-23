import { Request, Response } from "express";
import GaleriService from "../services/galeri.service";
import ResponseHelper from "../helpers/response.helper";
import PaginationHelper from "../helpers/pagination.helper";

export default class GaleriHandler {
  public static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const { page, limit } = PaginationHelper.parsePaginationQuery(req.query);

      const result = await GaleriService.getAll(page, limit);

      return ResponseHelper.success(res, result, "Data galeri berhasil didapatkan");
    } catch (error) {
      console.error("Error getting all data galeri:", error);
      return ResponseHelper.error(res, "Gagal mendapatkan data galeri");
    }
  }
}
