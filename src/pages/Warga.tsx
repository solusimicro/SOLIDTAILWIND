import Button from "../components/ButtonCollection";

export default function Warga() {
  return (
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      {/* Header */}
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">
          📋 Data Warga
        </h1>
        <Button type="purple" label="Tambah warga" />
      </div>

      {/* Search Bar */}
      <div class="mb-4">
        <input
          type="text"
          placeholder="🔍 Cari nama atau alamat..."
          class="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* Header Grid */}
      <div class="grid grid-cols-4 font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-gray-700 pb-2">
        <span>Nama</span>
        <span>Alamat</span>
        <span>No. HP</span>
        <span>Status</span>
      </div>

      {/* Data Rows */}
      <div class="divide-y divide-gray-200 dark:divide-gray-700 mt-3">
        {[
          ["Enrizal1", "Jl. Taman Bromo 5 No.1", "081234567890", "Lunas"],
          ["Wasiadi", "Jl. Taman Bromo 5 No.2", "082345678901", "Belum"],
          ["Dedi W", "Jl. Taman Bromo 5 No.3~5", "083456789012", "Lunas"],
          ["Rusmaji", "Jl. Taman Bromo 5 No.6", "083456789012", "Lunas"],
          ["Enrizal2", "Jl. Taman Bromo 5 No.7", "081234567890", "Lunas"],
          ["Mardiansyah", "Jl. Taman Bromo 5 No.8", "083456789012", "Lunas"],
          ["Masril", "Jl. Taman Bromo 5 No.9", "081234567890", "Lunas"],
          ["Ahyadi", "Jl. Taman Bromo 5 No.10", "081234567890", "Lunas"],
        ].map(([nama, alamat, hp, status]) => (
          <div class="grid grid-cols-4 gap-y-2 py-2 px-1 text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-800 rounded transition">
            <span>{nama}</span>
            <span>{alamat}</span>
            <span>{hp}</span>
            <span
              class={`font-medium ${
                status === "Lunas"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {status}
            </span>
          </div>
        ))}
      </div>

      {/* Footer Pagination */}
      <div class="flex justify-end items-center mt-6 gap-2 text-sm text-gray-700 dark:text-gray-300">
        <button class="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          ⟨
        </button>
        <span>Halaman 1 dari 5</span>
        <button class="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          ⟩
        </button>
      </div>
    </div>
  );
}
