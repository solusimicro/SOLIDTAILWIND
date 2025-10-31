import { createMemo, createSignal } from "solid-js";
import FormKas from "../components/FormKas";

export default function Kas() {
  const [kasList, setKasList] = createSignal([
    {
      id: 1,
      tanggal: "2025-10-01",
      keterangan: "Iuran Warga",
      jenis: "Masuk",
      nominal: 200000,
    },
    {
      id: 2,
      tanggal: "2025-10-03",
      keterangan: "Biaya Kebersihan",
      jenis: "Keluar",
      nominal: 50000,
    },
    {
      id: 3,
      tanggal: "2025-09-25",
      keterangan: "Sumbangan RT",
      jenis: "Masuk",
      nominal: 100000,
    },
    {
      id: 4,
      tanggal: "2025-09-10",
      keterangan: "Konsumsi Rapat",
      jenis: "Keluar",
      nominal: 30000,
    },
  ]);

  const [bulanFilter, setBulanFilter] = createSignal("");
  const [jenisFilter, setJenisFilter] = createSignal("");
  const [showForm, setShowForm] = createSignal(false);
  const [selectedKas, setSelectedKas] = createSignal<any>(null);
  const [toastMessage, setToastMessage] = createSignal("");

  // 🔍 Filter Data
  const filteredList = createMemo(() =>
    kasList().filter((item) => {
      const bulanItem = new Date(item.tanggal).toLocaleString("id-ID", {
        month: "long",
      });
      return (
        (bulanFilter() === "" || bulanItem === bulanFilter()) &&
        (jenisFilter() === "" || item.jenis === jenisFilter())
      );
    })
  );

  // 💰 Ringkasan
  const totalMasuk = createMemo(() =>
    filteredList()
      .filter((x) => x.jenis === "Masuk")
      .reduce((sum, x) => sum + x.nominal, 0)
  );

  const totalKeluar = createMemo(() =>
    filteredList()
      .filter((x) => x.jenis === "Keluar")
      .reduce((sum, x) => sum + x.nominal, 0)
  );

  const saldo = createMemo(() => totalMasuk() - totalKeluar());

  // 🔔 Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div class="relative p-6 grid grid-cols-1 md:grid-cols-4 gap-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* 📋 Sidebar Filter */}
      <aside class="md:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow p-4 border border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
          🔍 Filter Kas
        </h2>

        <div class="space-y-3">
          {/* Bulan */}
          <div>
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Periode (Bulan)
            </label>
            <select
              value={bulanFilter()}
              class="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100"
              onChange={(e) => setBulanFilter(e.currentTarget.value)}
            >
              <option value="">Semua Bulan</option>
              {[
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
              ].map((bulan) => (
                <option value={bulan}>{bulan}</option>
              ))}
            </select>
          </div>

          {/* Jenis */}
          <div>
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Jenis Transaksi
            </label>
            <select
              value={jenisFilter()}
              class="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100"
              onChange={(e) => setJenisFilter(e.currentTarget.value)}
            >
              <option value="">Semua Jenis</option>
              <option value="Masuk">Masuk</option>
              <option value="Keluar">Keluar</option>
            </select>
          </div>

          <button
            class="w-full mt-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-100 py-2 rounded-lg transition"
            onClick={() => {
              setBulanFilter("");
              setJenisFilter("");
            }}
          >
            🔄 Reset Filter
          </button>
        </div>
      </aside>

      {/* 💵 Main */}
      <main class="md:col-span-3 bg-white dark:bg-gray-800 rounded-2xl shadow p-4 border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-xl font-bold">💰 Kas RT</h1>
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition"
            onClick={() => {
              setSelectedKas(null);
              setShowForm(true);
            }}
          >
            + Tambah Transaksi
          </button>
        </div>

        {/* 💹 Ringkasan */}
        <div class="grid grid-cols-3 gap-4 mb-4 text-center">
          <div class="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 rounded-lg p-3 font-semibold">
            Masuk
            <br />
            Rp {totalMasuk().toLocaleString()}
          </div>
          <div class="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 rounded-lg p-3 font-semibold">
            Keluar
            <br />
            Rp {totalKeluar().toLocaleString()}
          </div>
          <div class="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-lg p-3 font-semibold">
            Saldo
            <br />
            Rp {saldo().toLocaleString()}
          </div>
        </div>

        {/* 📜 Tabel Transaksi */}
        <div class="overflow-x-auto">
          <table class="w-full border border-gray-200 dark:border-gray-700 text-sm">
            <thead class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100">
              <tr>
                <th class="p-2 border dark:border-gray-600">Tanggal</th>
                <th class="p-2 border dark:border-gray-600">Keterangan</th>
                <th class="p-2 border dark:border-gray-600">Jenis</th>
                <th class="p-2 border dark:border-gray-600">Nominal</th>
                <th class="p-2 border dark:border-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredList().length === 0 ? (
                <tr>
                  <td
                    colspan="5"
                    class="p-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                filteredList().map((item) => (
                  <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td class="p-2 border dark:border-gray-600">
                      {item.tanggal}
                    </td>
                    <td class="p-2 border dark:border-gray-600">
                      {item.keterangan}
                    </td>
                    <td
                      class={`p-2 border text-center font-medium dark:border-gray-600 ${
                        item.jenis === "Masuk"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {item.jenis}
                    </td>
                    <td class="p-2 border text-right dark:border-gray-600">
                      Rp {item.nominal.toLocaleString()}
                    </td>
                    <td class="p-2 border text-center dark:border-gray-600">
                      <button
                        class="text-blue-600 dark:text-blue-400 hover:underline mr-2"
                        onClick={() => {
                          setSelectedKas(item);
                          setShowForm(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        class="text-red-600 dark:text-red-400 hover:underline"
                        onClick={() => {
                          if (confirm("Hapus transaksi ini?")) {
                            setKasList(
                              kasList().filter((x) => x.id !== item.id)
                            );
                            showToast("🗑️ Transaksi dihapus");
                          }
                        }}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* 🧾 Form Tambah/Edit Kas */}
      {showForm() && (
        <FormKas
          data={selectedKas()}
          onClose={() => setShowForm(false)}
          onSubmit={(formData) => {
            if (selectedKas()) {
              setKasList((prev) =>
                prev.map((item) =>
                  item.id === selectedKas().id ? { ...item, ...formData } : item
                )
              );
              showToast("✅ Transaksi berhasil diperbarui");
            } else {
              setKasList((prev) => [...prev, { id: Date.now(), ...formData }]);
              showToast("✅ Transaksi berhasil ditambahkan");
            }
            setShowForm(false);
          }}
        />
      )}

      {/* 🔔 Toast */}
      {toastMessage() && (
        <div class="fixed bottom-5 right-5 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          {toastMessage()}
        </div>
      )}
    </div>
  );
}
