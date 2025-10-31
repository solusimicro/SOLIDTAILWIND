import { createSignal } from "solid-js";

export default function FormKas(props: {
  data?: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
}) {
  const [tanggal, setTanggal] = createSignal(props.data?.tanggal || "");
  const [keterangan, setKeterangan] = createSignal(
    props.data?.keterangan || ""
  );
  const [jenis, setJenis] = createSignal(props.data?.jenis || "Masuk");
  const [nominal, setNominal] = createSignal(props.data?.nominal || "");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!tanggal() || !keterangan() || !nominal()) {
      alert("Semua field wajib diisi!");
      return;
    }
    props.onSubmit({
      tanggal: tanggal(),
      keterangan: keterangan(),
      jenis: jenis(),
      nominal: parseInt(nominal()),
    });
  };

  return (
    <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96">
        <h2 class="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">
          {props.data ? "✏️ Edit Transaksi" : "➕ Tambah Transaksi"}
        </h2>

        <form onSubmit={handleSubmit} class="space-y-3">
          <div>
            <label class="block text-sm mb-1">Tanggal</label>
            <input
              type="date"
              value={tanggal()}
              onInput={(e) => setTanggal(e.currentTarget.value)}
              class="w-full border rounded p-2"
            />
          </div>
          <div>
            <label class="block text-sm mb-1">Keterangan</label>
            <input
              type="text"
              value={keterangan()}
              onInput={(e) => setKeterangan(e.currentTarget.value)}
              class="w-full border rounded p-2"
            />
          </div>
          <div>
            <label class="block text-sm mb-1">Jenis</label>
            <select
              value={jenis()}
              onChange={(e) => setJenis(e.currentTarget.value)}
              class="w-full border rounded p-2"
            >
              <option value="Masuk">Masuk</option>
              <option value="Keluar">Keluar</option>
            </select>
          </div>
          <div>
            <label class="block text-sm mb-1">Nominal</label>
            <input
              type="number"
              value={nominal()}
              onInput={(e) => setNominal(e.currentTarget.value)}
              class="w-full border rounded p-2"
            />
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button
              type="button"
              class="px-4 py-2 bg-gray-300 rounded"
              onClick={props.onClose}
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
