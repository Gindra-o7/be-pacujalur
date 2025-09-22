export interface Fasilitas {
  id: string;
  nama: string;
  penginapan_id: string;
}

export interface CreateFasilitasRequest {
  nama: string;
  penginapan_id: string;
}

export interface UpdateFasilitasRequest {
  nama?: string;
  penginapan_id?: string;
}
