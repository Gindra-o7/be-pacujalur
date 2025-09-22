import { Fasilitas } from "./fasilitas.type";

export interface Penginapan {
  id: string;
  nama: string;
  tipe: string;
  harga?: string;
  image_url?: string;
  deskripsi?: string | null;
  rating?: string;
  map_url?: string;
}

export interface CreatePenginapanRequest {
  nama: string;
  tipe: string;
  harga?: string;
  image_url?: string;
  deskripsi?: string;
  rating?: string;
  maps_url?: string;
}

export interface UpdatePenginapanRequest {
  nama?: string;
  tipe?: string;
  harga?: string;
  image_url?: string;
  deskripsi?: string;
  rating?: string;
  maps_url?: string;
}

export interface PenginapanWithFasilitas extends Penginapan {
  fasilitas: Fasilitas[];
}
