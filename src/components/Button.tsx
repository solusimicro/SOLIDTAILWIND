import { Plus } from "lucide-solid";

//Button collection

<button
  class="mt-6 w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-semibold shadow-lg transition"
  aria-label="Tambah Transaksi"
  onClick={() => alert("Buka form tambah transaksi")}
>
  <Plus class="w-5 h-5" />
  <span>Tambah Transaksi</span>
</button>;
