import { Galeri } from "./galeri.type";
import { Medsos } from "./medsos.type";

export interface Jalur {
  id: string;
  nama: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  deskripsi?: string | null;
}

export interface CreateJalurRequest extends Omit<Jalur, "id"> {
  medsos: Omit<Medsos, "id" | "jalur_id">[];
  galeri: Omit<Galeri, "id" | "jalur_id">[];
}
