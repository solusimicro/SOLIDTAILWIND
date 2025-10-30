export default function Kas() {
  return (
    <div class="p-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen transition-colors">
      <h2 class="text-2xl font-bold mb-4">Kas Page</h2>
      <div class="flex gap-4">
        <button class="flex-1 bg-blue-600 text-white py-2 rounded">
          Primary
        </button>
        <button class="w-32 bg-gray-200 text-gray-800 py-2 rounded">
          Secondary
        </button>
      </div>
    </div>
  );
}
