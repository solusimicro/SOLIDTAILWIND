import { Route, Router, Routes } from "@solidjs/router";
import { render } from "solid-js/web";
import Navbar from "./components/nNavbar";
import "./index.css";
import Home from "./pages/Home";
import Iuran from "./pages/Iuran";
import Kas from "./pages/Kas";
import Laporan from "./pages/Laporan";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Warga from "./pages/Warga";

render(
  () => (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/datawarga" component={Warga} />
        <Route path="/kas" component={Kas} />
        <Route path="/iuran" component={Iuran} />
        <Route path="/laporan" component={Laporan} />
        <Route path="/settings" component={Settings} />
        <Route path="/profile" component={Profile} />
      </Routes>
    </Router>
  ),
  document.getElementById("root")!
);
