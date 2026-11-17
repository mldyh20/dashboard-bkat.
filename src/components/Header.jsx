
import React from "react";
import "./Header.css";

// ==========================================
// KOMPONEN HEADER
// ==========================================

export default function Header() {
  return (
    <header className="top-header">
      {/* INFORMASI PORTAL */}
      <div className="header-brand">
        <span className="header-kicker">
          PORTAL INFORMASI
        </span>

        <strong>
          Pelayanan Data dan Informasi Air Tanah
        </strong>
      </div>

      {/* STATUS DASHBOARD */}
      <div className="header-right">
        <span className="online-dot"></span>

        <span>
          Dashboard Publik
        </span>
      </div>
    </header>
  );
}
