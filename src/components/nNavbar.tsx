import { NavLink } from "@solidjs/router";
import {
  BarChart2,
  Bell,
  Box,
  ChevronDown,
  CreditCard,
  Home,
  Moon,
  Settings,
  Sun,
  User,
  Users,
} from "lucide-solid";
import type { Component } from "solid-js";
import { createSignal, onCleanup, onMount } from "solid-js";

const Navbar: Component = () => {
  const [darkMode, setDarkMode] = createSignal(false);
  const [profileOpen, setProfileOpen] = createSignal(false);
  const [notifCount, setNotifCount] = createSignal(3);

  const STYLE_ID = "navbar-layout-styles";

  // Inject spacing styles so content tidak tertutup header/sidebar

  onMount(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDark = saved === "dark" || (!saved && prefersDark);
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);

    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.innerHTML = `
        .has-navbar-layout {
          padding-top: 4rem; /* header height */
          padding-bottom: 6rem; /* safe bottom space for mobile bottom nav */
        }
        @media (min-width: 768px) {
          .has-navbar-layout { padding-left: 16rem; } /* sidebar width = w-64 (16rem) */
        }
      `;
      document.head.appendChild(style);
    }
    document.body.classList.add("has-navbar-layout");

    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
  });

  onCleanup(() => {
    document.body.classList.remove("has-navbar-layout");
    document.removeEventListener("click", onDocClick);
    document.removeEventListener("keydown", onKey);
  });

  const toggleDark = (): void => {
    const next = !darkMode();
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.add("theme-transition");
    setTimeout(
      () => document.documentElement.classList.remove("theme-transition"),
      600
    );
  };

  // typed handlers

  const onDocClick = (e: Event): void => {
    const target = e.target as Node | null;
    const btn = document.getElementById("profile-btn");
    const menu = document.getElementById("profile-menu");
    if (!btn || !menu || !target) return;
    if (!btn.contains(target) && !menu.contains(target)) setProfileOpen(false);
  };

  const onKey = (e: KeyboardEvent): void => {
    if (e.key === "Escape") setProfileOpen(false);
  };

  return (
    <>
      {/* Header (logo left, actions right) */}
      <header class="fixed top-0 inset-x-0 h-16 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
        <div class="max-w-7xl mx-auto h-full px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <div class="flex items-center gap-3">
            <a href="/" class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12c0-3.866 3.134-7 7-7a7 7 0 1 1-7 7Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                  <path
                    d="M12 7v10M7 12h10"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <span class="font-semibold text-lg hidden sm:inline">MyApp</span>
            </a>
          </div>

          {/* Actions: notif, theme toggle (desktop), profile */}
          <div class="flex items-center gap-3">
            <button
              id="notif-btn"
              aria-label="Notifikasi"
              class="relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              onClick={() => setNotifCount(0)}
            >
              <Bell class="w-5 h-5 text-gray-700 dark:text-gray-200" />
              {notifCount() > 0 && (
                <span class="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">
                  {notifCount()}
                </span>
              )}
            </button>

            <button
              aria-label="Toggle theme"
              class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 hidden md:inline-flex"
              onClick={toggleDark}
            >
              {darkMode() ? (
                <Sun class="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon class="w-5 h-5 text-gray-700 dark:text-gray-200" />
              )}
            </button>

            <div class="relative">
              <button
                id="profile-btn"
                aria-haspopup="true"
                aria-expanded={profileOpen() ? "true" : "false"}
                class="flex items-center gap-2 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                onClick={() => setProfileOpen(!profileOpen())}
              >
                <img
                  src="https://i.pravatar.cc/300"
                  alt="Avatar"
                  class="w-8 h-8 rounded-full object-cover bg-gray-200"
                />
                <span class="hidden sm:inline text-sm text-gray-700 dark:text-gray-200">
                  Rudi
                </span>
                <ChevronDown class="w-4 h-4 text-gray-500 dark:text-gray-300" />
              </button>

              <div
                id="profile-menu"
                role="menu"
                class={`absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg overflow-hidden transform transition-all origin-top ${
                  profileOpen()
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
                style={{ "z-index": 60 }}
              >
                <NavLink
                  href="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div class="flex items-center gap-2">
                    <User class="w-4 h-4" /> <span>Profil</span>
                  </div>
                </NavLink>
                <NavLink
                  href="/settings"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div class="flex items-center gap-2">
                    <Settings class="w-4 h-4" /> <span>Pengaturan</span>
                  </div>
                </NavLink>
                <div class="border-t border-gray-100 dark:border-gray-700"></div>
                <button
                  class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => alert("Logout")}
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop left sidebar */}
      <aside class="hidden md:fixed md:inset-y-0 md:left-0 md:w-64 md:pt-16 md:flex md:flex-col md:border-r md:border-gray-200 dark:md:border-gray-700 md:bg-white/60 dark:md:bg-gray-900/60 md:backdrop-blur z-30">
        <nav class="px-2 py-4 flex-1 space-y-1 overflow-auto">
          <NavLink
            href="/"
            class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            activeClass="bg-indigo-50 dark:bg-gray-800 text-indigo-600"
          >
            <Home class="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            href="/datawarga"
            class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            activeClass="bg-indigo-50 dark:bg-gray-800 text-indigo-600"
          >
            <Users class="w-5 h-5" />
            <span>Data Warga</span>
          </NavLink>

          <NavLink
            href="/iuran"
            class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            activeClass="bg-indigo-50 dark:bg-gray-800 text-indigo-600"
          >
            <CreditCard class="w-5 h-5" />
            <span>Iuran</span>
          </NavLink>

          <NavLink
            href="/kas"
            class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            activeClass="bg-indigo-50 dark:bg-gray-800 text-indigo-600"
          >
            <Box class="w-5 h-5" />
            <span>Kas RT</span>
          </NavLink>

          <NavLink
            href="/laporan"
            class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            activeClass="bg-indigo-50 dark:bg-gray-800 text-indigo-600"
          >
            <BarChart2 class="w-5 h-5" />
            <span>Laporan</span>
          </NavLink>

          <NavLink
            href="/settings"
            class="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            activeClass="bg-indigo-50 dark:bg-gray-800 text-indigo-600"
          >
            <Settings class="w-5 h-5" />
            <span>Pengaturan</span>
          </NavLink>
        </nav>
      </aside>

      {/* Mobile bottom navigation */}
      <nav class="md:hidden fixed bottom-0 inset-x-0">
        <div class="bg-white/90 dark:bg-gray-900/90 backdrop-blur border border-gray-200 dark:border-gray-700 rounded-none shadow-lg px-3 py-2 flex justify-between">
          <NavLink
            href="/"
            class="flex-1 text-center text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition py-1 px-2 rounded-lg"
            activeClass="text-indigo-600 bg-indigo-50 dark:bg-gray-800"
          >
            <div class="flex flex-col items-center text-xs">
              <Home class="w-6 h-6 mb-0.5" />
              <span>Dashboard</span>
            </div>
          </NavLink>

          <NavLink
            href="/datawarga"
            class="flex-1 text-center text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition py-1 px-2 rounded-lg"
            activeClass="text-indigo-600 bg-indigo-50 dark:bg-gray-800"
          >
            <div class="flex flex-col items-center text-xs">
              <Users class="w-6 h-6 mb-0.5" />
              <span>Data Warga</span>
            </div>
          </NavLink>

          <NavLink
            href="/iuran"
            class="flex-1 text-center text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition py-1 px-2 rounded-lg"
            activeClass="text-indigo-600 bg-indigo-50 dark:bg-gray-800"
          >
            <div class="flex flex-col items-center text-xs">
              <CreditCard class="w-6 h-6 mb-0.5" />
              <span>Iuran</span>
            </div>
          </NavLink>

          <NavLink
            href="/profile"
            class="flex-1 text-center text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition py-1 px-2 rounded-lg"
            activeClass="text-indigo-600 bg-indigo-50 dark:bg-gray-800"
          >
            <div class="flex flex-col items-center text-xs">
              <User class="w-6 h-6 mb-0.5" />
              <span>Profile</span>
            </div>
          </NavLink>
        </div>
      </nav>

      {/* Mobile floating theme toggle */}
      <button
        class="md:hidden fixed bottom-20 right-5 z-50 p-3 rounded-full shadow-lg bg-indigo-600 text-white dark:bg-yellow-400 dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        onClick={toggleDark}
        aria-label="Toggle theme"
      >
        {darkMode() ? <Sun class="w-5 h-5" /> : <Moon class="w-5 h-5" />}
      </button>

      {/* spacer so page content doesn't overlap header */}
      {/*<div class="h-16 md:h-16"></div>*/}
    </>
  );
};

export default Navbar;
