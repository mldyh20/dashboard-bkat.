import React, { useMemo, useState } from "react";

import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import DataTable from "./DataTable.jsx";
import { cocokJenis } from "../jenisLayanan.js";
import useSheetData from "../useSheetData.js";

import "./DataPelayanan.css";

export default function DataPelayanan({ onNavigate, jenis = "Semua" }) {
  const { data, loading, error } = useSheetData();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Semua");

  // Data sesuai menu jenis layanan yang diklik di sidebar
  const dataJenis = useMemo(
    () => data.filter((item) => cocokJenis(item.jenis, jenis)),
    [data, jenis]
  );

  const filtered = useMemo(() => {
    return dataJenis.filter((item) => {
      const cocokPencarian = `${item.nama} ${item.instansi} ${item.jenis}`
        .toLowerCase()
        .includes(search.toLowerCase());

      return cocokPencarian && (status === "Semua" || item.status === status);
    });
  }, [dataJenis, search, status]);

  const total = dataJenis.length;
  const selesai = dataJenis.filter((d) => d.status === "Selesai").length;
  const proses = dataJenis.filter((d) => d.status === "Proses").length;

  const judul = jenis === "Semua" ? "Data Pelayanan" : jenis;

  return (
    <div className="app-layout">
      <Sidebar
        activePage="layanan"
        activeJenis={jenis}
        onNavigate={onNavigate}
      />

      <main className="main-content">
        <Header />

        <section className="welcome">
          <div>
            <p className="eyebrow">DATA PELAYANAN</p>
            <h1>{judul}</h1>
            <p className="muted">
              {jenis === "Semua"
                ? "Seluruh permohonan pelayanan data dan informasi air tanah."
                : `Permohonan pelayanan jenis ${jenis}.`}
            </p>
          </div>

          <div className="period">
            Total: <strong>{total} Permohonan</strong>
          </div>
        </section>

        {loading && <p className="muted">Memuat data dari spreadsheet...</p>}
        {error && <p className="muted">Gagal memuat data: {error}</p>}

        {/* RINGKASAN */}
        <section className="pelayanan-stats">
          <div className="pelayanan-card">
            <span>Total Permohonan</span>
            <strong>{total}</strong>
            <small>{judul}</small>
          </div>

          <div className="pelayanan-card selesai">
            <span>Permohonan Selesai</span>
            <strong>{selesai}</strong>
            <small>Pelayanan telah selesai</small>
          </div>

          <div className="pelayanan-card proses">
            <span>Dalam Proses</span>
            <strong>{proses}</strong>
            <small>Pelayanan sedang diproses</small>
          </div>
        </section>

        {/* TABEL DATA */}
        <section className="panel pelayanan-table-panel">
          <div className="panel-heading pelayanan-heading">
            <div>
              <h2>Daftar {judul}</h2>
              <p className="muted">Menampilkan data permohonan pelayanan.</p>
            </div>

            <span className="jumlah-data">{filtered.length} data ditemukan</span>
          </div>

          {/* PENCARIAN DAN FILTER STATUS */}
          <div className="pelayanan-filters">
            <input
              type="text"
              placeholder="Cari nama atau instansi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Semua">Semua Status</option>
              <option value="Selesai">Selesai</option>
              <option value="Proses">Proses</option>
            </select>
          </div>

          <DataTable data={filtered} />
        </section>

        <footer>
          Data Pelayanan · Sistem Informasi Pelayanan Air Tanah · BKAT
        </footer>
      </main>
    </div>
  );
}