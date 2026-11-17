import React, { useState } from "react";
import "./Sidebar.css";
import logoBKAT from "../logo.png";
import { cocokJenis } from "../JenisLayanan.js";

export default function Sidebar({
  activePage,
  activeJenis = "Semua",
  onNavigate,
}) {
  const [bukaLayanan, setBukaLayanan] = useState(activePage === "layanan");

  function pergi(halaman, jenis = "Semua") {
    if (onNavigate) onNavigate(halaman, jenis);
  }

  return (
    <aside className="sidebar">
      {/* BRAND / LOGO */}
      <div className="brand">
        <div className="brand-logo">
          <img src={logoBKAT} alt="Logo BKAT" />
        </div>

        <div className="brand-info">
          <strong>BKAT</strong>
          <small>Balai Konservasi Air Tanah</small>
        </div>
      </div>

      {/* MENU UTAMA */}
      <div className="nav-label">MENU UTAMA</div>

      <nav className="sidebar-nav">
        {/* DASHBOARD */}
        <a
          href="#dashboard"
          className={`nav-item ${activePage === "dashboard" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            pergi("dashboard");
          }}
        >
          <span className="nav-icon">▦</span>
          <span>Dashboard</span>
        </a>

        {/* DATA PELAYANAN + SUBMENU */}
        <a
          href="#layanan"
          className={`nav-item ${activePage === "layanan" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            setBukaLayanan(!bukaLayanan);
            pergi("layanan", "Semua");
          }}
        >
          <span className="nav-icon">▤</span>
          <span>Data Pelayanan</span>
          <span className={`nav-arrow ${bukaLayanan ? "buka" : ""}`}>▾</span>
        </a>

        {bukaLayanan && (
          <div className="submenu">
            {JENIS_LAYANAN.map((j) => (
              <a
                key={j.label}
                href="#layanan"
                className={`submenu-item ${
                  activePage === "layanan" && activeJenis === j.label
                    ? "active"
                    : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  pergi("layanan", j.label);
                }}
              >
                {j.label}
              </a>
            ))}
          </div>
        )}

        {/* LAPORAN */}
        <a
          href="#laporan"
          className={`nav-item ${activePage === "laporan" ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            pergi("laporan");
          }}
        >
          <span className="nav-icon">▥</span>
          <span>Laporan &amp; Unduhan</span>
        </a>
      </nav>

      {/* SIDEBAR FOOTER */}
      <div className="sidebar-bottom">
        <span>Sistem Informasi</span>
        <strong>Pelayanan Air Tanah</strong>
      </div>
    </aside>
  );
}