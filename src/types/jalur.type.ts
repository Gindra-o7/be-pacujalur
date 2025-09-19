export interface Jalur {
    id: string;
    nama: string;
    desa: string;
    kecamatan: string;
    kabupaten: string;
    provinsi: string;
    image_url?: string | null;
    deskripsi?: string | null;
    url_medsos?: string | null;
}