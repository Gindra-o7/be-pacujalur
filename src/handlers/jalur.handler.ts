import { Request, Response } from "express";
import JalurService from "../services/jalur.service";

export default class JalurHandler {
  public static async get(req: Request, res: Response) {
    try {
      const result = await JalurService.get();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
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
