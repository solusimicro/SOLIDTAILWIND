import { Show, createSignal, onMount } from "solid-js";

export default function FormIuran(props: {
  visible: boolean;
  onClose: () => void;
  data?: any;
}) {
  const [nama, setNama] = createSignal("");
  const [bulan, setBulan] = createSignal("");
  const [jumlah, setJumlah] = createSignal("");
  const [status, setStatus] = createSignal("Belum Bayar");

  onMount(() => {
    if (props.data) {
      setNama(props.data.nama || "");
      setBulan(props.data.bulan || "");
      setJumlah(props.data.jumlah || "");
      setStatus(props.data.status || "Belum Bayar");
    }
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const newData = {
      nama: nama(),
      bulan: bulan(),
      jumlah: jumlah(),
      status: status(),
    };
    console.log("✅ Data iuran disimpan:", newData);
    alert("Data iuran berhasil disimpan!");
    props.onClose();
  };

  return (
    <Show when={props.visible}>
      <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-96">
          <h2 class="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
            {props.data ? "Edit Iuran" : "Tambah Iuran"}
          </h2>

          <form onSubmit={handleSubmit} class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nama Warga
              </label>
              <input
                type="text"
                value={nama()}
                onInput={(e) => setNama(e.currentTarget.value)}
                class="w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Bulan
              </label>
              <input
                type="month"
                value={bulan()}
                onInput={(e) => setBulan(e.currentTarget.value)}
                class="w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Jumlah (Rp)
              </label>
              <input
                type="number"
                value={jumlah()}
                onInput={(e) => setJumlah(e.currentTarget.value)}
                class="w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status Pembayaran
              </label>
              <select
                value={status()}
                onInput={(e) => setStatus(e.currentTarget.value)}
                class="w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white"
              >
                <option>Belum Bayar</option>
                <option>Sudah Bayar</option>
              </select>
            </div>

            <div class="flex justify-end gap-2 pt-4">
              <button
                type="button"
                class="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md"
                onClick={props.onClose}
              >
                Batal
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </Show>
  );
}
 