import { PaginationQuery, PaginatedResponse } from "../types/common.type";

export default class PaginationHelper {
  public static getOffset(page: number, limit: number): number {
    return (page - 1) * limit;
  }

  public static buildPaginatedResponse<T>(data: T[], page: number, limit: number, total: number): PaginatedResponse<T> {
    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  public static parsePaginationQuery(query: any): { page: number; limit: number } {
    const page = Math.max(1, parseInt(query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
    return { page, limit };
  }
}
