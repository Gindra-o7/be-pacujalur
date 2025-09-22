import { Request, Response, NextFunction } from "express";
import GlobalService from "../services/global.service";
import { GlobalServiceHealthResponse, GlobalServiceIntroduceResponse } from "../types/global.type";

export default class GlobalHandler {
  public static async introduce(req: Request, res: Response, next: NextFunction) {
    try {
      const introduceMessage: GlobalServiceIntroduceResponse = await GlobalService.introduce();
      return res.status(200).json(introduceMessage);
    } catch (err) {
      next(err);
    }
  }

  public static async health(req: Request, res: Response, next: NextFunction) {
    try {
      const healthMessage: GlobalServiceHealthResponse = await GlobalService.health();
      return res.status(200).json(healthMessage);
    } catch (err) {
      next(err);
    }
  }

  public static async notFound(req: Request, res: Response, next: NextFunction) {
    return res.status(404).json({
      response: false,
      message: "Waduh, mau nyari apa kamu mas? 😅",
    });
  }

  public static async error(err: any, req: Request, res: Response, next: NextFunction) {
    if (!err.statusCode) {
      console.error(`🤯 [ERROR] - [${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })} WIB] ${err.message}`);
      console.error(`😫 [LOG] ${err.stack}`);
      return res.status(500).json({
        response: false,
        message: "Waduh, ada yang error nih di-server kami! 😭",
      });
    }
    return res.status(err.statusCode || 500).json({
      response: false,
      message: err.message,
    });
  }
}
