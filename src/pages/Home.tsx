import { CreditCard, DollarSign, Plus } from "lucide-solid";
import type { Component } from "solid-js";
import { For } from "solid-js";

/**
 * Helper: ubah array angka jadi path cubic-bezier (Catmull-Rom to cubic bezier)
 */
function catmullRom2bezier(xs: number[], ys: number[]) {
  const n = xs.length;
  if (n === 0) return "";
  if (n === 1) return `M ${xs[0]} ${ys[0]}`;

  const p = xs.map((x, i) => [x, ys[i]]);
  p.unshift(p[0]);
  p.push(p[p.length - 1]);

  let path = `M ${p[1][0]} ${p[1][1]}`;
  for (let i = 1; i < p.length - 2; i++) {
    const [x0, y0] = p[i - 1];
    const [x1, y1] = p[i];
    const [x2, y2] = p[i + 1];
    const [x3, y3] = p[i + 2];

    const cx1 = x1 + (x2 - x0) / 6;
    const cy1 = y1 + (y2 - y0) / 6;
    const cx2 = x2 - (x3 - x1) / 6;
    const cy2 = y2 - (y3 - y1) / 6;

    path += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
  }
  return path;
}

const formatIDR = (v: number) =>
  v.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

const Dashboard: Component = () => {
  const saldo = 12_500_000;
  const monthly = [
    8_000_000, 8_200_000, 7_800_000, 9_000_000, 9_500_000, 9_800_000,
    10_200_000, 10_800_000, 11_500_000, 12_000_000, 11_800_000, 12_500_000,
  ];

  // prepare points for SVG
  const padding = { left: 8, right: 8, top: 12, bottom: 12 };
  const w = 640;
  const h = 160;
  const min = Math.min(...monthly);
  const max = Math.max(...monthly);
  const range = Math.max(1, max - min);

  const xs: number[] = [];
  const ys: number[] = [];

  for (let i = 0; i < monthly.length; i++) {
    const x =
      padding.left +
      ((w - padding.left - padding.right) * i) / (monthly.length - 1);
    const y =
      padding.top +
      (h - padding.top - padding.bottom) * (1 - (monthly[i] - min) / range);
    xs.push(x);
    ys.push(y);
  }

  const linePath = catmullRom2bezier(xs, ys);
  const areaPath = `${linePath} L ${xs.at(-1)} ${h - padding.bottom} L ${
    xs[0]
  } ${h - padding.bottom} Z`;

  return (
    <div class="pt-4 md:pl-4 pb-8">
      <main class="max-w-5xl mx-auto p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: Saldo Kas + Grafik */}
          <section class="bg-white/50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm backdrop-blur-sm">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-sm text-gray-500 dark:text-gray-300">
                  Saldo Kas
                </h3>
                <h2 class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                  {formatIDR(saldo)}
                </h2>
              </div>
              <div class="bg-gray-50 dark:bg-gray-900 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm shadow-sm">
                {formatIDR(saldo)}
              </div>
            </div>

            {/* Grafik */}
            <div class="mt-6">
              <h4 class="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Grafik Arus Kas Bulanan
              </h4>
              <svg viewBox={`0 0 ${w} ${h}`} class="w-full h-40">
                <defs>
                  <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop
                      offset="0%"
                      stop-color="#3b82f6"
                      stop-opacity="0.18"
                    />
                    <stop
                      offset="100%"
                      stop-color="#3b82f6"
                      stop-opacity="0.02"
                    />
                  </linearGradient>
                  <linearGradient id="lineGrad" x1="0" x2="1">
                    <stop offset="0%" stop-color="#2563eb" />
                    <stop offset="100%" stop-color="#3b82f6" />
                  </linearGradient>
                </defs>

                {/* area */}
                <path d={areaPath} fill="url(#areaGrad)" stroke="none" />

                {/* line */}
                <path
                  d={linePath}
                  fill="none"
                  stroke="url(#lineGrad)"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                {/* dots */}
                <For each={xs}>
                  {(x, i) => (
                    <circle
                      cx={x}
                      cy={ys[i()]}
                      r="3"
                      fill="white"
                      stroke="#2563eb"
                      stroke-width="1.4"
                    />
                  )}
                </For>
              </svg>
            </div>

            {/* Info bawah */}
            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div class="text-xs text-gray-500 dark:text-gray-300">
                  Iuran Bulan Ini
                </div>
                <div class="mt-2 text-sm font-medium text-gray-800 dark:text-gray-100">
                  80% warga sudah bayar
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div class="text-xs text-gray-500 dark:text-gray-300">
                  Pengeluaran Kegiatan
                </div>
                <div class="mt-2 text-sm font-medium text-gray-800 dark:text-gray-100">
                  Rp 1.250.000
                </div>
              </div>
            </div>
          </section>

          {/* Card: Kegiatan Terbaru */}
          <aside class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Kegiatan Terbaru
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-300 mt-2">
                Aktivitas terakhir dan opsi cepat
              </p>

              <div class="mt-6 grid grid-cols-2 gap-3">
                <button class="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition">
                  <div class="w-8 h-8 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-md">
                    <DollarSign class="w-4 h-4" />
                  </div>
                  <div class="text-left">
                    <div class="text-sm font-medium text-gray-800 dark:text-gray-100">
                      Pemasukan
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">
                      Transaksi kas masuk
                    </div>
                  </div>
                </button>

                <button class="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition">
                  <div class="w-8 h-8 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-md">
                    <CreditCard class="w-4 h-4" />
                  </div>
                  <div class="text-left">
                    <div class="text-sm font-medium text-gray-800 dark:text-gray-100">
                      Pengeluaran
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">
                      Biaya kegiatan
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <button
              class="mt-6 w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-semibold shadow-lg transition"
              aria-label="Tambah Transaksi"
              onClick={() => alert("Buka form tambah transaksi")}
            >
              <Plus class="w-5 h-5" />
              <span>Tambah Transaksi</span>
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
