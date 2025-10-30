import { Show, createSignal } from "solid-js";
import qrisImage from "../assets/myqris.png"; // ⬅️ pindah ke atas, di luar function

export default function QrisPaymentForm(props: {
  visible: boolean;
  onClose: () => void;
  data: any;
}) {
  const [bukti, setBukti] = createSignal<File | null>(null);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!bukti()) {
      alert("Silakan upload bukti pembayaran terlebih dahulu!");
      return;
    }
    alert("✅ Bukti pembayaran berhasil diupload!");
    props.onClose();
  };

  return (
    <Show when={props.visible}>
      <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96">
          <h2 class="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">
            Pembayaran Iuran - {props.data?.bulan}
          </h2>

          <div class="text-sm mb-3 text-gray-700 dark:text-gray-300">
            Silakan scan QRIS berikut untuk melakukan pembayaran:
          </div>

          <div class="flex justify-center mb-4">
            <img
              src={qrisImage}
              alt="QRIS"
              class="w-48 h-48 border rounded-lg shadow"
            />
          </div>

          <form onSubmit={handleSubmit}>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload Bukti Pembayaran:
            </label>
            <input
              type="file"
              accept="image/*"
              class="w-full border rounded p-2 text-sm dark:bg-gray-900 dark:text-gray-100"
              onInput={(e) =>
                setBukti(
                  e.currentTarget.files ? e.currentTarget.files[0] : null
                )
              }
            />

            <div class="flex justify-end gap-2 mt-4">
              <button
                type="button"
                class="px-4 py-2 text-sm bg-gray-300 dark:bg-gray-700 rounded"
                onClick={props.onClose}
              >
                Batal
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Upload Bukti
              </button>
            </div>
          </form>
        </div>
      </div>
    </Show>
  );
}
