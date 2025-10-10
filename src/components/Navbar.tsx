import { NavLink } from "@solidjs/router";
import { ChevronDown, Home, Moon, Settings, Sun, User } from "lucide-solid";
import { createSignal, onMount } from "solid-js";

export default function Navbar() {
  const [darkMode, setDarkMode] = createSignal(false);
  const [dropdownOpen, setDropdownOpen] = createSignal(false);

  // 🔹 Load dark mode dari localStorage / preferensi sistem
  onMount(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  });

  // 🔹 Toggle dark mode + simpan ke localStorage
  const toggleDark = () => {
    const newMode = !darkMode();
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");

    // 🔹 Tambahkan animasi halus saat transisi tema
    document.documentElement.classList.add("theme-transition");
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 600);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <header class="hidden md:flex justify-between items-center px-8 py-4 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-10 transition-colors duration-500">
        <div class="flex items-center gap-6">
          <h1 class="text-2xl font-semibold tracking-wide">MyApp</h1>

          <nav class="flex items-center gap-6">
            <NavLink
              href="/"
              class="flex items-center gap-2 px-2 py-1 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-500 transition-all"
              activeClass="text-blue-500 font-semibold"
            >
              <Home class="w-5 h-5" /> <span>Home</span>
            </NavLink>

            <NavLink
              href="/Profile"
              class="flex items-center gap-2 px-2 py-1 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-500 transition-all"
              activeClass="text-blue-500 font-semibold"
            >
              <User class="w-5 h-5" /> <span>Profile</span>
            </NavLink>

            {/* Dropdown Menu */}
            <div class="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen())}
                class="flex items-center gap-2 px-2 py-1 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-500 transition-all"
              >
                <Settings class="w-5 h-5" /> <span>Settings</span>
                <ChevronDown class="w-4 h-4" />
              </button>

              {dropdownOpen() && (
                <div class="absolute top-full mt-2 right-0 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg overflow-hidden animate-fade-in">
                  <NavLink
                    href="/settings/account"
                    class="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 transition"
                  >
                    Account
                  </NavLink>
                  <NavLink
                    href="/settings/preferences"
                    class="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 transition"
                  >
                    Preferences
                  </NavLink>
                </div>
              )}
            </div>
          </nav>
        </div>

        <button
          onClick={toggleDark}
          class="p-2 rounded-full hover:scale-110 active:scale-95 transition-transform duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {darkMode() ? (
            <Sun class="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon class="w-5 h-5 text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </header>

      {/* Mobile Bottom Navbar */}
      <nav class="md:hidden fixed bottom-0 left-0 w-full bg-white/90 dark:bg-gray-900/90 border-t border-gray-200 dark:border-gray-700 backdrop-blur-md flex justify-around items-center py-2 shadow-lg z-20">
        <NavLink
          href="/"
          class="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200 hover:text-blue-500 focus:text-blue-500 active:text-blue-600 active:bg-blue-100 dark:active:bg-gray-800 rounded-lg px-3 py-1 transition-all duration-200"
          activeClass="text-blue-500 bg-blue-100 dark:bg-gray-800"
        >
          <Home class="w-6 h-6 mb-1" /> <span>Home</span>
        </NavLink>

        <NavLink
          href="/Profile"
          class="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200 hover:text-blue-500 focus:text-blue-500 active:text-blue-600 active:bg-blue-100 dark:active:bg-gray-800 rounded-lg px-3 py-1 transition-all duration-200"
          activeClass="text-blue-500 bg-blue-100 dark:bg-gray-800"
        >
          <User class="w-6 h-6 mb-1" /> <span>Profile</span>
        </NavLink>

        <NavLink
          href="/settings"
          class="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200 hover:text-blue-500 focus:text-blue-500 active:text-blue-600 active:bg-blue-100 dark:active:bg-gray-800 rounded-lg px-3 py-1 transition-all duration-200"
          activeClass="text-blue-500 bg-blue-100 dark:bg-gray-800"
        >
          <Settings class="w-6 h-6 mb-1" /> <span>Settings</span>
        </NavLink>
      </nav>

      {/* Floating Dark Mode Button (Mobile) */}
      <button
        onClick={toggleDark}
        class="md:hidden fixed bottom-16 right-5 bg-blue-500 dark:bg-yellow-400 text-white dark:text-gray-900 p-4 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 z-30"
      >
        {darkMode() ? <Sun class="w-6 h-6" /> : <Moon class="w-6 h-6" />}
      </button>
    </>
  );
}
