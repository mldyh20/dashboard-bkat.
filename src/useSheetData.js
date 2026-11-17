import { useEffect, useState } from "react";
import Papa from "papaparse";

const SHEET_ID = "18j-Z8fC-kJ0XQm7Alb_oZ1MkwJVioITvrbBOcdzNUwA";
const GID = "0"; // gid tab yang berisi data (lihat di URL sheet setelah gid=)
export const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${GID}`;

// "Tanggal Surat Masuk" -> "tanggal_surat_masuk"
const norm = (h) =>
  String(h).trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

// Setiap field boleh punya beberapa kemungkinan nama header
const KOLOM = {
  no: ["no"],
  idInternal: ["id_internal"],
  tanggal: ["tanggal_surat_masuk"],
  penanggungJawab: ["penanggung_jawab"],
  nama: ["nama_pemohon"],
  instansi: ["instansi_1"],
  instansi2: ["instansi_2"],
  jenis: ["jenis_pelayanan"],
  status: ["status"],
  // Permintaan Data
  judul: ["judul_penelitian"],
  tujuan: ["tujuan_permintaan_data", "tujuan_permintaan"],
  tema: ["tema"],
  dataDiminta: ["data_yang_diminta"],
  lokasi: ["lokasi_permintaan_data", "lokasi"],
  tahun: ["tahun"],
  tindakLanjut: ["tindak_lanjut"],
  keterangan: ["keterangan"],
};

const BULAN = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];

// "01/01/26" -> "01 Jan 2026"
function rapikanTanggal(teks) {
  const m = String(teks).trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (!m) return String(teks).trim();
  const hari = m[1].padStart(2, "0");
  const bulan = BULAN[Number(m[2]) - 1] || m[2];
  const tahun = m[3].length === 2 ? `20${m[3]}` : m[3];
  return `${hari} ${bulan} ${tahun}`;
}

// Done = Selesai, selain itu = Proses
function normalisasiStatus(teks) {
  return String(teks).trim().toLowerCase() === "done" ? "Selesai" : "Proses";
}

// Ambil nilai pertama yang ketemu dari daftar kemungkinan header
function ambilNilai(row, kandidat) {
  for (const k of kandidat) {
    if (row[k] != null && String(row[k]).trim() !== "") return String(row[k]).trim();
  }
  return "";
}

export default function useSheetData(intervalMs = 60000) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let aktif = true;

    async function ambil() {
      try {
        const res = await fetch(SHEET_URL);
        if (!res.ok) throw new Error("Gagal mengambil data sheet");
        const teks = await res.text();

        const hasil = Papa.parse(teks, {
          header: true,
          skipEmptyLines: true,
          transformHeader: norm,
        });

        const rapi = hasil.data
          .map((row) => {
            const v = (key) => ambilNilai(row, KOLOM[key]);
            return {
              no: v("no"),
              idInternal: v("idInternal"),
              tanggal: rapikanTanggal(v("tanggal")),
              penanggungJawab: v("penanggungJawab"),
              nama: v("nama"),
              instansi: v("instansi"),
              instansi2: v("instansi2"),
              jenis: v("jenis"),
              status: normalisasiStatus(v("status")),
              // Permintaan Data
              judul: v("judul"),
              tujuan: v("tujuan"),
              tema: v("tema"),
              dataDiminta: v("dataDiminta"),
              lokasi: v("lokasi"),
              tahun: v("tahun"),
              tindakLanjut: v("tindakLanjut"),
              keterangan: v("keterangan"),
            };
          })
          .filter((row) => row.nama);

        if (aktif) {
          setData(rapi);
          setError("");
        }
      } catch (e) {
        if (aktif) setError(e.message);
      } finally {
        if (aktif) setLoading(false);
      }
    }

    ambil();
    const timer = setInterval(ambil, intervalMs);
    return () => {
      aktif = false;
      clearInterval(timer);
    };
  }, [intervalMs]);

  return { data, loading, error };
}