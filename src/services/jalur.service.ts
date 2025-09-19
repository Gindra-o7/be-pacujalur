import JalurRepository from "../repositories/jalur.repository";
import { CreateJalurRequest, Jalur } from "../types/jalur.type";

export default class JalurService {
  public static async get(): Promise<Jalur[]> {
    return JalurRepository.find();
  }

  public static async post(data: CreateJalurRequest) {
    if (!data.nama || !data.desa || !data.kecamatan || !data.kabupaten || !data.provinsi) {
      throw new Error("Alamat lengkap harus diisi");
    }
    return JalurRepository.create(data);
  }
}
