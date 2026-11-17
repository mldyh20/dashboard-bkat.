import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// =====================================
// DATA JENIS PELAYANAN
// =====================================

const data = [
  { name: "Permintaan Data", jumlah: 40 },
  { name: "Kerja Praktek/Magang", jumlah: 11 },
  { name: "Narasumber", jumlah: 10 },
  { name: "Bimbingan Teknis Tugas Akhir", jumlah: 6 },
  { name: "Kerjasama", jumlah: 6 },
];

// =====================================
// SERVICE CHART COMPONENT
// =====================================

export default function ServiceChart() {
  return (
    <section className="panel">

      {/* PANEL HEADING */}
      <div className="panel-heading">
        <div>
          <h2>Komposisi Jenis Pelayanan</h2>
          <p className="muted">
            Jumlah kategori layanan (ilustrasi awal)
          </p>
        </div>
      </div>

      {/* CHART CONTAINER */}
      <div
        style={{
          width: "100%",
          height: 260,
        }}
      >
        <ResponsiveContainer>
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 4,
              right: 18,
              left: 12,
              bottom: 4,
            }}
          >

            {/* GRID */}
            <CartesianGrid
              stroke="#edf1f6"
              horizontal={false}
            />

            {/* X AXIS */}
            <XAxis
              type="number"
              tick={{
                fill: "#8190a5",
                fontSize: 10,
              }}
              axisLine={false}
              tickLine={false}
            />

            {/* Y AXIS */}
            <YAxis
              type="category"
              dataKey="name"
              width={125}
              tick={{
                fill: "#61738b",
                fontSize: 10,
              }}
              axisLine={false}
              tickLine={false}
            />

            {/* TOOLTIP */}
            <Tooltip />

            {/* BAR */}
            <Bar
              dataKey="jumlah"
              fill="#3978b9"
              radius={[0, 5, 5, 0]}
              barSize={22}
            />

          </BarChart>
        </ResponsiveContainer>
      </div>

    </section>
  );
}
