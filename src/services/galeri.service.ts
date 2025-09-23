import GaleriRepository from "../repositories/galeri.repository";
import { Galeri } from "../types/galeri.type";
import { PaginatedResponse } from "../types/common.type";
import PaginationHelper from "../helpers/pagination.helper";

export default class GaleriService {
  public static async getAll(page: number, limit: number): Promise<PaginatedResponse<Galeri>> {
    const offset = PaginationHelper.getOffset(page, limit);
    const { data, total } = await GaleriRepository.findAll(offset, limit);

    return PaginationHelper.buildPaginatedResponse(data, page, limit, total);
  }
}