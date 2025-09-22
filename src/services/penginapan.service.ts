import PenginapanRepository from "../repositories/penginapan.repository";
import FasilitasRepository from "../repositories/fasilitas.repository";
import { Fasilitas } from "../types/fasilitas.type";
import { PaginatedResponse } from "../types/common.type";
import PaginationHelper from "../helpers/pagination.helper";
import { Penginapan, CreatePenginapanRequest, UpdatePenginapanRequest, PenginapanWithFasilitas } from "../types/penginapan.type";

export default class PenginapanService {
  public static async getAll(page: number, limit: number): Promise<PaginatedResponse<Penginapan>> {
    const offset = PaginationHelper.getOffset(page, limit);
    const { data, total } = await PenginapanRepository.findAll(offset, limit);

    return PaginationHelper.buildPaginatedResponse(data, page, limit, total);
  }

  public static async getById(id: string): Promise<PenginapanWithFasilitas | null> {
    const penginapan = await PenginapanRepository.findById(id);
    if (!penginapan) {
      return null;
    }

    const fasilitas = await FasilitasRepository.findByPenginapanId(id);

    return {
      ...penginapan,
      fasilitas,
    };
  }

  public static async push(data: CreatePenginapanRequest): Promise<Penginapan> {
    return await PenginapanRepository.create(data);
  }

  public static async put(id: string, data: UpdatePenginapanRequest): Promise<Penginapan | null> {
    const exists = await PenginapanRepository.exists(id);
    if (!exists) {
      return null;
    }

    return await PenginapanRepository.update(id, data);
  }

  public static async delete(id: string): Promise<boolean> {
    const exists = await PenginapanRepository.exists(id);
    if (!exists) {
      return false;
    }

    await FasilitasRepository.deleteByPenginapanId(id);

    return await PenginapanRepository.delete(id);
  }

  public static async penginapanExists(id: string): Promise<boolean> {
    return await PenginapanRepository.exists(id);
  }
}
