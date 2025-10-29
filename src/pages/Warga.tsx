import Button from "../components/ButtonCollection";

export default function Warga() {
  return (
    <div class="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">📋 Data Warga </h1>
        <Button type="purple" label="Tambah warga" />
      </div>

      {/* Search Bar */}
      <div class="mb-4">
        <input
          type="text"
          placeholder="🔍 Cari nama atau alamat..."
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Header Grid */}
      <div class="grid grid-cols-4 font-semibold text-gray-700 border-b pb-2">
        <span>Nama</span>
        <span>Alamat</span>
        <span>No. HP</span>
        <span>Status</span>
      </div>

      {/* Data Rows */}
      <div class="grid grid-cols-4 gap-y-3 mt-3 text-gray-800">
        <span>Enrizal1</span>
        <span>Jl. Taman Bromo 5 No.1</span>
        <span>081234567890</span>
        <span>Lunas</span>
        <span>Wasiadi</span>
        <span>Jl. Taman Bromo 5 No.2</span>
        <span>082345678901</span>
        <span>Belum</span>
        <span>Dedi W</span>
        <span>Jl. Taman Bromo 5 No.3~5</span>
        <span>083456789012</span>
        <span>Lunas</span>
        <span>Rusmaji</span>
        <span>Jl. Taman Bromo 5 No.6</span>
        <span>083456789012</span>
        <span>Lunas</span>
        <span>Enrizal2</span>
        <span>Jl. Taman Bromo 5 No.7</span>
        <span>081234567890</span>
        <span>Lunas</span>
        <span>Mardiansyah</span>
        <span>Jl. Taman Bromo 5 No.8</span>
        <span>083456789012</span>
        <span>Lunas</span>
        <span>Masril</span>
        <span>Jl. Taman Bromo 5 No.9</span>
        <span>081234567890</span>
        <span>Lunas</span>
        <span>Ahyadi</span>
        <span>Jl. Taman Bromo 5 No.10</span>
        <span>081234567890</span>
        <span>Lunas</span>
      </div>

      {/* Footer Pagination */}
      <div class="flex justify-end items-center mt-6 gap-2 text-sm">
        <button class="px-3 py-1 border rounded hover:bg-gray-100">⟨</button>
        <span>Halaman 1 dari 5</span>
        <button class="px-3 py-1 border rounded hover:bg-gray-100">⟩</button>
      </div>
    </div>
  );
}
