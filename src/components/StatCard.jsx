import React from "react";
import "./StatCard.css";

export default function StatCard({ label, value, note, icon }) {
  return (
    <article className="stat-card">
      <div className="stat-top"><span>{label}</span><div className="stat-icon">{icon}</div></div>
      <div className="stat-value">{value}</div>
      <div className="stat-note">{note}</div>
    </article>
  );
}
