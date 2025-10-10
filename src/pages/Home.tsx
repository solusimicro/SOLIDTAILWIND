import { CreditCard, DollarSign, Plus } from "lucide-solid";
import type { Component } from "solid-js";
import { For } from "solid-js";
/**
 * Helper: ubah array angka jadi path cubic-bezier (Catmull-Rom to cubic bezier)
 * Source: banyak implementasi serupa; ini sederhana & cocok untuk sparkline.
 */
function catmullRom2bezier(xs: number[], ys: number[]) {
  const d = [];
  const n = xs.length;
  if (n === 0) return "";
  if (n === 1) return `M ${xs[0]} ${ys[0]}`;
  // For endpoints, duplicate first/last to compute tangents

  const p = [];
  for (let i = 0; i < n; i++) p.push([xs[i], ys[i]]);
  // duplicate endpoints

  p.unshift(p[0]);
  p.push(p[p.length - 1]);

  let path = `M ${p[1][0]} ${p[1][1]}`;
  for (let i = 1; i < p.length - 2; i++) {
    const p0 = p[i - 1];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2];

    const x1 = p1[0] + (p2[0] - p0[0]) / 6;
    const y1 = p1[1] + (p2[1] - p0[1]) / 6;

    const x2 = p2[0] - (p3[0] - p1[0]) / 6;
    const y2 = p2[1] - (p3[1] - p1[1]) / 6;

    path += ` C ${x1} ${y1}, ${x2} ${y2}, ${p2[0]} ${p2[1]}`;
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
  // Mock data

  const saldo = 12500000; // Rp 12.500.000

  const monthly = [
    8000000, 8200000, 7800000, 9000000, 9500000, 9800000, 10200000, 10800000,
    11500000, 12000000, 11800000, 12500000,
  ];

  // prepare points for svg

  const padding = { left: 8, right: 8, top: 12, bottom: 12 };
  const w = 640; // virtual width for path (will scale via viewBox)
  const h = 160;
  const n = monthly.length;
  const xs: number[] = [];
  const ys: number[] = [];
  const min = Math.min(...monthly);
  const max = Math.max(...monthly);
  const range = Math.max(1, max - min);

  for (let i = 0; i < n; i++) {
    const x = padding.left + ((w - padding.left - padding.right) * i) / (n - 1);
    // invert y (0 top) mapping so higher value -> lower y

    const y =
      padding.top +
      (h - padding.top - padding.bottom) * (1 - (monthly[i] - min) / range);
    xs.push(x);
    ys.push(y);
  }
  const linePath = catmullRom2bezier(xs, ys);
  // area path: from left baseline to right baseline

  const areaPath = `${linePath} L ${xs[xs.length - 1]} ${
    h - padding.bottom
  } L ${xs[0]} ${h - padding.bottom} Z`;

  return (
    <div class="pt-4 md:pl-4 pb-8">
      <main class="max-w-5xl mx-auto p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: Saldo Kas + Grafik */}
          <section class="bg-transparent dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-sm">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-sm text-gray-500 dark:text-gray-300">
                  Saldo Kas
                </h3>
                <div class="mt-2 flex items-center gap-4">
                  <h2 class="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                    {formatIDR(saldo)}
                  </h2>
                </div>
              </div>

              <div class="ml-auto">
                <div class="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-lg border border-gray-100 dark:border-gray-700 text-sm shadow-sm">
                  {formatIDR(saldo)}
                </div>
              </div>
            </div>

            <div class="mt-6">
              <h4 class="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Grafik Arus Kas Bulanan
              </h4>

              <div class="w-full"> 
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
                    <filter
                      id="soft"
                      x="-20%"
                      y="-20%"
                      width="140%"
                      height="140%"
                    >
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feBlend in="SourceGraphic" in2="blur" mode="normal" />
                    </filter>
                  </defs>

                  {/* area */}
                  <path d={areaPath} fill="url(#areaGrad)" stroke="none" />

                  {/* line */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke="url(#lineGrad)"
                    stroke-width="3.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  {/* optional dots */}
                  <g>
                    <For each={xs}>
                      {(x, i) => (
                        <circle
                          cx={x}
                          cy={ys[i()]}
                          r="3.5"
                          fill="#fff"
                          stroke="#2563eb"
                          stroke-width="1.6"
                        />
                      )}
                    </For>
                  </g>
                </svg>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700 rounded-lg p-4">
                <div class="text-xs text-gray-500 dark:text-gray-300">
                  Iuran Bulan Ini
                </div>
                <div class="mt-2 text-sm font-medium text-gray-800 dark:text-gray-100">
                  80% warga sudah bayar
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-700 rounded-lg p-4">
                <div class="text-xs text-gray-500 dark:text-gray-300">
                  Pengeluaran Kegiatan
                </div>
                <div class="mt-2 text-sm font-medium text-gray-800 dark:text-gray-100">
                  Rp 1.250.000
                </div>
              </div>
            </div>
          </section>

          {/* Card: Kegiatan Terbaru + tombol */}
          <aside class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Kegiatan Terbaru
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-300 mt-2">
                Aktivitas terakhir dan opsi cepat
              </p>

              <div class="mt-6 grid grid-cols-2 gap-3">
                <button class="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition">
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

                <button class="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition">
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

            <div class="mt-6">
              <button
                class="mt-4 w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-semibold shadow-lg transition"
                aria-label="Tambah Transaksi"
                onClick={() => alert("Buka form tambah transaksi")}
              >
                <Plus class="w-5 h-5" />
                <span>Tambah Transaksi</span>
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
