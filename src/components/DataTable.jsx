
import React from "react";
import "./DataTable.css";

export default function DataTable({ data }) {
  return (
    <div className="table-scroll">
      <table className="service-table">
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Nama Pemohon</th>
            <th>Instansi</th>
            <th>Jenis Pelayanan</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={`${item.nama}-${index}`}>
                <td>{item.tanggal}</td>

                <td className="person-name">
                  {item.nama}
                </td>

                <td>{item.instansi}</td>

                <td>{item.jenis}</td>

                <td>
                  <span
                    className={`status ${
                      item.status === "Selesai"
                        ? "done"
                        : "process"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="empty-row">
                Data tidak ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
