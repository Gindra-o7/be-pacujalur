import { Response } from "express";
import { ApiResponse } from "../types/common.type";

export default class ResponseHelper {
  public static success<T>(res: Response, data: T, message: string = "Success", statusCode: number = 200): Response {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
    };
    return res.status(statusCode).json(response);
  }

  public static error(res: Response, message: string, statusCode: number = 500, error?: string): Response {
    const response: ApiResponse = {
      success: false,
      message,
      error,
    };
    return res.status(statusCode).json(response);
  }

  public static notFound(res: Response, message: string = "Resource not found"): Response {
    return this.error(res, message, 404);
  }

  public static badRequest(res: Response, message: string = "Bad request", error?: string): Response {
    return this.error(res, message, 400, error);
  }

  public static created<T>(res: Response, data: T, message: string = "Created successfully"): Response {
    return this.success(res, data, message, 201);
  }
}
