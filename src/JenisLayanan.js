
// Daftar jenis layanan resmi + kata kunci untuk mencocokkan isi kolom di spreadsheet
export const JENIS_LAYANAN = [
  { label: "Permintaan Data", kata: ["permintaan data"] },
  {
    label: "Kerja Praktik / Magang",
    kata: ["kerja praktik", "kerja praktek", "magang"],
  },
  {
    label: "Bimbingan Teknis Tugas Akhir",
    kata: ["bimbingan teknis", "tugas akhir"],
  },
  { label: "Narasumber", kata: ["narasumber"] },
];

// Cek apakah teks jenis (dari data/sheet) termasuk kategori yang dipilih
export function cocokJenis(teksJenis, labelDipilih) {
  if (labelDipilih === "Semua") return true;

  const kategori = JENIS_LAYANAN.find((j) => j.label === labelDipilih);
  if (!kategori) return false;

  const teks = String(teksJenis).toLowerCase();
  return kategori.kata.some((k) => teks.includes(k));
}
