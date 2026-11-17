import React, { useState } from "react";
import Dashboard from "./Dashboard.jsx";
import DataPelayanan from "./components/DataPelayanan.jsx";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [jenis, setJenis] = useState("Semua");

  // menyimpan halaman DAN jenis layanan yang diklik di sidebar
  function navigate(halaman, jenisBaru = "Semua") {
    setPage(halaman);
    setJenis(jenisBaru);
  }

  if (page === "layanan") {
    return <DataPelayanan onNavigate={navigate} jenis={jenis} />;
  }

  return <Dashboard onNavigate={navigate} />;
}