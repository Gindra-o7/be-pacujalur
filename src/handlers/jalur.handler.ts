import { Request, Response } from "express";
import JalurService from "../services/jalur.service";
import ResponseHelper from "../helpers/response.helper";
import PaginationHelper from "../helpers/pagination.helper";

export default class JalurHandler {
  public static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const { page, limit } = PaginationHelper.parsePaginationQuery(req.query);

      const result = await JalurService.getAll(page, limit);

      return ResponseHelper.success(res, result, "Data jalur berhasil didapatkan");
    } catch (error) {
      console.error("Error get all data jalur:", error);
      return ResponseHelper.error(res, "Gagal mendapatkan data jalur");
    }
  }

  public static async post(req: Request, res: Response) {
    try {
      const result = await JalurService.post(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: "Data tidak valid" });
    }
  }
}
