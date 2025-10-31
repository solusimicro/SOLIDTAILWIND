import jsPDF from "jspdf";
import "jspdf-autotable";
import { Bar } from "solid-chartjs";
import { createMemo, createSignal, For, onMount, Show } from "solid-js";
import * as XLSX from "xlsx";

export default function Laporan() {
  const [filterJenis, setFilterJenis] = createSignal("Semua");
  const [filterBulan, setFilterBulan] = createSignal("");
  const [selectedDetail, setSelectedDetail] = createSignal(null);
  const [isDark, setIsDark] = createSignal(false);

  onMount(() => {
    const checkDark = () =>
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    checkDark();
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", checkDark);
  });

  // 💰 Data dummy
  const dataLaporan = [
    {
      id: 1,
      tanggal: "2025-10-01",
      keterangan: "Iuran Warga Bulan Oktober",
      jenis: "Kas Masuk",
      masuk: 1200000,
      keluar: 0,
      petugas: "Budi RT",
      catatan: "Dibayar oleh 40 warga melalui QRIS",
    },
    {
      id: 2,
      tanggal: "2025-10-02",
      keterangan: "Pembelian Peralatan Pos Ronda",
      jenis: "Kas Keluar",
      masuk: 0,
      keluar: 450000,
      petugas: "Andi RW",
      catatan: "Pembelian 2 senter & 1 kursi plastik",
    },
    {
      id: 3,
      tanggal: "2025-09-15",
      keterangan: "Iuran Bulan September",
      jenis: "Kas Masuk",
      masuk: 1150000,
      keluar: 0,
      petugas: "Budi RT",
      catatan: "Terlambat 3 warga, dibayar tunai",
    },
  ];

  // 🔍 Filter data
  const filteredData = createMemo(() =>
    dataLaporan.filter((item) => {
      const byJenis = filterJenis() === "Semua" || item.jenis === filterJenis();
      const byBulan =
        !filterBulan() || item.tanggal.startsWith(filterBulan().slice(0, 7));
      return byJenis && byBulan;
    })
  );

  // 📊 Grafik
  const chartData = {
    labels: ["Jul", "Agu", "Sep", "Okt"],
    datasets: [
      {
        label: "Kas Masuk",
        backgroundColor: "#16a34a",
        data: [1000000, 1250000, 1150000, 1200000],
      },
      {
        label: "Kas Keluar",
        backgroundColor: "#dc2626",
        data: [500000, 400000, 300000, 450000],
      },
    ],
  };

  const chartOptions = createMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: isDark() ? "#e5e7eb" : "#1f2937",
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `Rp ${ctx.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDark() ? "#d1d5db" : "#374151",
        },
        grid: {
          color: isDark() ? "#374151" : "#e5e7eb",
        },
      },
      y: {
        ticks: {
          color: isDark() ? "#d1d5db" : "#374151",
          callback: (value) => `Rp ${value.toLocaleString()}`,
        },
        grid: {
          color: isDark() ? "#374151" : "#e5e7eb",
        },
      },
    },
  }));

  // 📦 Ekspor ke Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredData().map((x) => ({
        Tanggal: x.tanggal,
        Keterangan: x.keterangan,
        Jenis: x.jenis,
        Masuk: x.masuk,
        Keluar: x.keluar,
        Petugas: x.petugas,
        Catatan: x.catatan,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Laporan");
    XLSX.writeFile(wb, "Laporan_Keuangan_RT.xlsx");
  };

  // 📄 Cetak ke PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Laporan Keuangan RT", 14, 15);

    const tableData = filteredData().map((x) => [
      x.tanggal,
      x.keterangan,
      x.jenis,
      x.masuk > 0 ? `Rp ${x.masuk.toLocaleString()}` : "-",
      x.keluar > 0 ? `Rp ${x.keluar.toLocaleString()}` : "-",
    ]);

    doc.autoTable({
      head: [["Tanggal", "Keterangan", "Jenis", "Masuk", "Keluar"]],
      body: tableData,
      startY: 25,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 163, 74] },
    });

    doc.save("Laporan_Keuangan_RT.pdf");
  };

  return (
    <div class="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen transition">
      {/* 🧾 Header & Filter */}
      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow mb-5">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h1 class="text-lg font-bold text-gray-800 dark:text-gray-100">
            📑 Laporan Keuangan RT
          </h1>

          <div class="flex flex-wrap gap-3">
            <select
              class="border rounded p-2 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
              value={filterJenis()}
              onInput={(e) => setFilterJenis(e.currentTarget.value)}
            >
              <option>Semua</option>
              <option>Kas Masuk</option>
              <option>Kas Keluar</option>
              <option>Iuran</option>
            </select>

            <input
              type="month"
              class="border rounded p-2 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
              value={filterBulan()}
              onInput={(e) => setFilterBulan(e.currentTarget.value)}
            />

            <button
              class="bg-gray-200 dark:bg-gray-700 dark:text-gray-100 text-sm px-3 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              onClick={() => {
                setFilterJenis("Semua");
                setFilterBulan("");
              }}
            >
              ♻️ Reset
            </button>
          </div>
        </div>
      </div>

      {/* 📋 Tabel Laporan */}
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <table class="w-full text-sm border-collapse">
          <thead class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
            <tr>
              <th class="p-2 text-left">Tanggal</th>
              <th class="p-2 text-left">Keterangan</th>
              <th class="p-2 text-left">Jenis</th>
              <th class="p-2 text-right">Masuk</th>
              <th class="p-2 text-right">Keluar</th>
            </tr>
          </thead>
          <tbody>
            <For each={filteredData()}>
              {(item) => (
                <tr
                  class="border-t border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition cursor-pointer"
                  onClick={() => setSelectedDetail(item)}
                >
                  <td class="p-2 text-gray-700 dark:text-gray-200">
                    {item.tanggal}
                  </td>
                  <td class="p-2 text-gray-700 dark:text-gray-200">
                    {item.keterangan}
                  </td>
                  <td class="p-2 text-gray-700 dark:text-gray-200">
                    {item.jenis}
                  </td>
                  <td class="p-2 text-right text-gray-700 dark:text-gray-200">
                    {item.masuk > 0 ? `Rp ${item.masuk.toLocaleString()}` : "-"}
                  </td>
                  <td class="p-2 text-right text-gray-700 dark:text-gray-200">
                    {item.keluar > 0
                      ? `Rp ${item.keluar.toLocaleString()}`
                      : "-"}
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>

        {/* 📊 Grafik */}
        <div class="mt-6 h-80">
          <h2 class="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            📈 Ringkasan Bulanan
          </h2>
          <Bar data={chartData} options={chartOptions()} />
        </div>

        {/* 📋 Detail Laporan */}
        <Show when={selectedDetail()}>
          <div class="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border dark:border-gray-600">
            <h3 class="font-semibold mb-3 text-gray-800 dark:text-gray-100">
              🔍 Detail Transaksi
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <p>
                <strong>Tanggal:</strong> {selectedDetail().tanggal}
              </p>
              <p>
                <strong>Jenis:</strong> {selectedDetail().jenis}
              </p>
              <p>
                <strong>Keterangan:</strong> {selectedDetail().keterangan}
              </p>
              <p>
                <strong>Petugas:</strong> {selectedDetail().petugas}
              </p>
              <p>
                <strong>Masuk:</strong>{" "}
                {selectedDetail().masuk > 0
                  ? `Rp ${selectedDetail().masuk.toLocaleString()}`
                  : "-"}
              </p>
              <p>
                <strong>Keluar:</strong>{" "}
                {selectedDetail().keluar > 0
                  ? `Rp ${selectedDetail().keluar.toLocaleString()}`
                  : "-"}
              </p>
              <p class="col-span-2">
                <strong>Catatan:</strong> {selectedDetail().catatan}
              </p>
            </div>

            <div class="flex justify-end mt-3">
              <button
                class="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
                onClick={() => setSelectedDetail(null)}
              >
                ✖ Tutup
              </button>
            </div>
          </div>
        </Show>

        {/* ⬇️ Tombol Ekspor */}
        <div class="flex justify-end mt-5 gap-3">
          <button
            class="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700"
            onClick={exportToExcel}
          >
            ⬇️ Ekspor Excel
          </button>
          <button
            class="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
            onClick={exportToPDF}
          >
            🧾 Cetak PDF
          </button>
        </div>
      </div>
    </div>
  );
}
