import { Route, Routes } from "@solidjs/router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Iuran";

export default function App() {
  return (
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Navbar />
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/Profile" component={Profile} />
      </Routes>
    </div>
  );
}
