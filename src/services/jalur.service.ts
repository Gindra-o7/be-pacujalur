import PaginationHelper from "../helpers/pagination.helper";
import JalurRepository from "../repositories/jalur.repository";
import { CreateJalurRequest } from "../types/jalur.type";

export default class JalurService {
  public static async getAll(page: number, limit: number){
    const offset = PaginationHelper.getOffset(page, limit);
    const { data, total } = await JalurRepository.findAll(offset, limit);

    return PaginationHelper.buildPaginatedResponse(data, page, limit, total);
  }

  public static async post(data: CreateJalurRequest) {
    if (!data.nama || !data.desa || !data.kecamatan || !data.kabupaten || !data.provinsi) {
      throw new Error("Alamat lengkap harus diisi");
    }
    return JalurRepository.create(data);
  }
}
