import React, { useMemo, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import StatCard from "./components/StatCard.jsx";
import ServiceChart from "./components/ServiceChart.jsx";
import { JENIS_LAYANAN, cocokJenis } from "./JenisLayanan.js";
import useSheetData from "./useSheetData.js";

import "./Dashboard.css";

const BATAS_INSTANSI = 10;

export default function Dashboard({ onNavigate }) {
  const { data, loading, error } = useSheetData();

  const [cariInstansi, setCariInstansi] = useState("");
  const [semuaInstansi, setSemuaInstansi] = useState(false);

  // STATISTIK
  const total = data.length;
  const selesai = data.filter((d) => d.status === "Selesai").length;
  const proses = data.filter((d) => d.status === "Proses").length;
  const totalJenis = JENIS_LAYANAN.reduce(
    (jumlah, j) =>
      jumlah + data.filter((d) => cocokJenis(d.jenis, j.label)).length,
    0
  );

  // REKAP PER INSTANSI (otomatis mengikuti sheet)
  const rekapInstansi = useMemo(() => {
    const peta = new Map();

    data.forEach((item) => {
      const nama = (item.instansi || "").trim() || "Tidak diisi";
      const kunci = nama.toLowerCase();
      const lama = peta.get(kunci);

      peta.set(kunci, {
        nama: lama ? lama.nama : nama,
        jumlah: (lama ? lama.jumlah : 0) + 1,
      });
    });

    return [...peta.values()].sort((a, b) => b.jumlah - a.jumlah);
  }, [data]);

  // REKAP PER KELOMPOK (Akademisi, Swasta, dst.)
  const rekapKelompok = useMemo(() => {
    const peta = new Map();

    data.forEach((item) => {
      const nama = (item.jenisInstansi || "").trim() || "Lainnya";
      peta.set(nama, (peta.get(nama) || 0) + 1);
    });

    return [...peta.entries()]
      .map(([nama, jumlah]) => ({ nama, jumlah }))
      .sort((a, b) => b.jumlah - a.jumlah);
  }, [data]);

  const terbanyak = rekapInstansi.length ? rekapInstansi[0].jumlah : 1;

  const instansiDicari = rekapInstansi.filter((item) =>
    item.nama.toLowerCase().includes(cariInstansi.toLowerCase())
  );

  // Saat mencari, tampilkan semua hasil pencarian
  const instansiTampil =
    semuaInstansi || cariInstansi
      ? instansiDicari
      : instansiDicari.slice(0, BATAS_INSTANSI);

  return (
    <div className="app-layout">
      <Sidebar activePage="dashboard" onNavigate={onNavigate} />

      <main className="main-content">
        <Header />

        <section className="welcome">
          <div>
            <p className="eyebrow">RINGKASAN PELAYANAN</p>
            <h1>Dashboard Pelayanan Data dan Informasi Air Tanah</h1>
            <p className="muted">
              Pantau rekapitulasi layanan dan informasi secara terpusat.
            </p>
          </div>

          <div className="period">
            Periode: <strong>Seluruh Data</strong>
          </div>
        </section>

        {loading && <p className="muted">Memuat data dari spreadsheet...</p>}
        {error && <p className="muted">Gagal memuat data: {error}</p>}

        {/* KARTU STATISTIK */}
        <section className="stats-grid">
          <StatCard
            label="Total Permohonan"
            value={total}
            note="Permohonan unik"
            icon="▤"
          />
          <StatCard
            label="Jenis Pelayanan"
            value={totalJenis}
            note="Termasuk layanan gabungan"
            icon="▥"
          />
          <StatCard
            label="Permohonan Selesai"
            value={selesai}
            note="Pelayanan telah selesai"
            icon="✓"
          />
          <StatCard
            label="Dalam Proses"
            value={proses}
            note="Pelayanan sedang diproses"
            icon="◷"
          />
        </section>

        {/* GRAFIK */}
        <section className="charts-grid">
          <ServiceChart />
        </section>

        {/* INSTANSI PEMOHON */}
        <section className="panel instansi-panel">
          <div className="panel-heading table-heading">
            <div>
              <h2>Instansi Pemohon</h2>
              <p className="muted">
                {rekapInstansi.length} instansi telah mengajukan permohonan
              </p>
            </div>

            <input
              type="text"
              className="instansi-cari"
              value={cariInstansi}
              onChange={(e) => setCariInstansi(e.target.value)}
              placeholder="Cari instansi..."
            />
          </div>

          {/* Ringkasan per kelompok instansi */}
          <div className="kelompok-grid">
            {rekapKelompok.map((k) => (
              <div className="kelompok-card" key={k.nama}>
                <span>{k.nama}</span>
                <strong>{k.jumlah}</strong>
              </div>
            ))}
          </div>

          {/* Daftar instansi */}
          <div className={`instansi-list ${semuaInstansi ? "panjang" : ""}`}>
            {instansiTampil.length === 0 && (
              <p className="muted">Instansi tidak ditemukan.</p>
            )}

            {instansiTampil.map((item) => (
              <div className="instansi-row" key={item.nama}>
                <span className="instansi-nama" title={item.nama}>
                  {item.nama}
                </span>

                <div className="instansi-bar">
                  <div
                    className="instansi-bar-isi"
                    style={{ width: `${(item.jumlah / terbanyak) * 100}%` }}
                  />
                </div>

                <strong className="instansi-jumlah">{item.jumlah}</strong>
              </div>
            ))}
          </div>

          {!cariInstansi && instansiDicari.length > BATAS_INSTANSI && (
            <button
              type="button"
              className="instansi-toggle"
              onClick={() => setSemuaInstansi(!semuaInstansi)}
            >
              {semuaInstansi
                ? "Tampilkan lebih sedikit"
                : `Tampilkan semua (${instansiDicari.length})`}
            </button>
          )}
        </section>

        <footer>
          Dashboard Pelayanan Data dan Informasi Air Tanah · BKAT
        </footer>
      </main>
    </div>
  );
}