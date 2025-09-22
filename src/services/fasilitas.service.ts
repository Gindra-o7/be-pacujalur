import FasilitasRepository from "../repositories/fasilitas.repository";
import PenginapanRepository from "../repositories/penginapan.repository";
import { Fasilitas, CreateFasilitasRequest, UpdateFasilitasRequest } from "../types/fasilitas.type";
import { PaginatedResponse } from "../types/common.type";
import PaginationHelper from "../helpers/pagination.helper";

export default class FasilitasService {
  public static async getAll(page: number, limit: number): Promise<PaginatedResponse<Fasilitas>> {
    const offset = PaginationHelper.getOffset(page, limit);
    const { data, total } = await FasilitasRepository.findAll(offset, limit);
    
    return PaginationHelper.buildPaginatedResponse(data, page, limit, total);
  }

  public static async getByPenginapanId(penginapanId: string): Promise<Fasilitas[]> {
    const penginapanExists = await PenginapanRepository.exists(penginapanId);
    if (!penginapanExists) {
      throw new Error('Penginapan not found');
    }

    return await FasilitasRepository.findByPenginapanId(penginapanId);
  }

  public static async getById(id: string): Promise<Fasilitas | null> {
    return await FasilitasRepository.findById(id);
  }

  public static async push(data: CreateFasilitasRequest): Promise<Fasilitas> {
    const penginapanExists = await PenginapanRepository.exists(data.penginapan_id);
    if (!penginapanExists) {
      throw new Error('Penginapan not found');
    }

    return await FasilitasRepository.create(data);
  }

  public static async put(id: string, data: UpdateFasilitasRequest): Promise<Fasilitas | null> {
    const fasilitas = await FasilitasRepository.findById(id);
    if (!fasilitas) {
      return null;
    }

    if (data.penginapan_id && data.penginapan_id !== fasilitas.penginapan_id) {
      const penginapanExists = await PenginapanRepository.exists(data.penginapan_id);
      if (!penginapanExists) {
        throw new Error('Penginapan not found');
      }
    }

    return await FasilitasRepository.update(id, data);
  }

  public static async delete(id: string): Promise<boolean> {
    const fasilitas = await FasilitasRepository.findById(id);
    if (!fasilitas) {
      return false;
    }
    return await FasilitasRepository.delete(id);
  }
}