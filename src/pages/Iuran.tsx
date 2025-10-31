import { createMemo, createSignal } from "solid-js";
import QrisPaymentForm from "../components/QrisPaymentForm";

export default function Iuran() {
  const [iuranList, setIuranList] = createSignal([
    {
      id: 1,
      nama: "Rusmaji",
      bulan: "Oktober",
      status: "Lunas",
      nominal: 50000,
    },
    {
      id: 2,
      nama: "Enrizal",
      bulan: "Oktober",
      status: "Belum Lunas",
      nominal: 50000,
    },
    {
      id: 3,
      nama: "Wasiadi",
      bulan: "September",
      status: "Menunggu Verifikasi",
      nominal: 50000,
    },
  ]);

  const [bulanFilter, setBulanFilter] = createSignal("");
  const [statusFilter, setStatusFilter] = createSignal("");
  const [showForm, setShowForm] = createSignal(false);
  const [selectedIuran, setSelectedIuran] = createSignal<any>(null);
  const [toastMessage, setToastMessage] = createSignal("");

  // 🔍 Filter daftar iuran
  const filteredList = createMemo(() =>
    iuranList().filter(
      (item) =>
        (bulanFilter() === "" || item.bulan === bulanFilter()) &&
        (statusFilter() === "" || item.status === statusFilter())
    )
  );

  // 🔔 Tampilkan notifikasi sementara
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div class="relative p-6 grid grid-cols-1 md:grid-cols-4 gap-6 bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* 📋 Sidebar Filter */}
      <aside class="md:col-span-1 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-2xl shadow p-4 border border-gray-100 transition-colors">
        <h2 class="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
          🔍 Filter Iuran
        </h2>

        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Periode (Bulan)
            </label>
            <select
              class="w-full border rounded-lg p-2 text-gray-700 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
              value={bulanFilter()}
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

            <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 mt-3">
              Status Pembayaran
            </label>
            <select
              class="w-full border rounded-lg p-2 text-gray-700 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-600"
              value={statusFilter()}
              onChange={(e) => setStatusFilter(e.currentTarget.value)}
            >
              <option value="">Semua Status</option>
              <option value="Lunas">Lunas</option>
              <option value="Belum Lunas">Belum Lunas</option>
              <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
            </select>
          </div>

          <button
            class="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 py-2 rounded-lg transition"
            onClick={() => {
              setBulanFilter("");
              setStatusFilter("");
            }}
          >
            🔄 Reset Filter
          </button>
        </div>
      </aside>

      {/* 🧾 Daftar Iuran */}
      <main class="md:col-span-3 bg-white dark:bg-gray-800 rounded-2xl shadow p-4 border border-gray-100 dark:border-gray-700 transition-colors">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-xl font-bold text-gray-800 dark:text-gray-100">
            💰 Data Iuran Warga
          </h1>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            Total: {filteredList().length} data
          </span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full border border-gray-200 dark:border-gray-700 text-sm">
            <thead class="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-100">
              <tr>
                <th class="p-2 border dark:border-gray-700">Nama</th>
                <th class="p-2 border dark:border-gray-700">Bulan</th>
                <th class="p-2 border dark:border-gray-700">Nominal</th>
                <th class="p-2 border dark:border-gray-700">Status</th>
                <th class="p-2 border dark:border-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredList().length === 0 ? (
                <tr>
                  <td
                    class="p-4 text-center text-gray-500 dark:text-gray-400"
                    colspan="5"
                  >
                    Tidak ada data ditemukan
                  </td>
                </tr>
              ) : (
                filteredList().map((item) => (
                  <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td class="p-2 border dark:border-gray-700 text-gray-800 dark:text-gray-100">
                      {item.nama}
                    </td>
                    <td class="p-2 border dark:border-gray-700 text-gray-800 dark:text-gray-100">
                      {item.bulan}
                    </td>
                    <td class="p-2 border dark:border-gray-700 text-gray-800 dark:text-gray-100">
                      Rp {item.nominal.toLocaleString()}
                    </td>
                    <td class="p-2 border dark:border-gray-700 text-center">
                      <span
                        class={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === "Lunas"
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : item.status === "Menunggu Verifikasi"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td class="p-2 border dark:border-gray-700 text-center">
                      {item.status === "Lunas" ? (
                        <span class="text-green-600 dark:text-green-400 font-semibold">
                          ✔
                        </span>
                      ) : item.status === "Menunggu Verifikasi" ? (
                        <span class="text-blue-600 dark:text-blue-400 text-sm font-medium italic">
                          ⏳ Diproses...
                        </span>
                      ) : (
                        <button
                          class="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-3 py-1 rounded-lg"
                          onClick={() => {
                            setSelectedIuran(item);
                            setShowForm(true);
                          }}
                        >
                          Bayar
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* 💳 Form QRIS */}
      {showForm() && (
        <QrisPaymentForm
          visible={showForm()}
          onClose={() => setShowForm(false)}
          data={selectedIuran()}
        />
      )}

      {/* 🔔 Toast Notification */}
      {toastMessage() && (
        <div class="fixed bottom-5 right-5 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          {toastMessage()}
        </div>
      )}
    </div>
  );
}
