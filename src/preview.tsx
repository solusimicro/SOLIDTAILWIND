import { Route, Router, Routes } from "@solidjs/router";
import { render } from "solid-js/web";
import ButtonVariants from "./components/Button";

render(
  () => (
    <Router>
      <Routes>
        <Route path="/preview" component={ButtonVariants} />
      </Routes>
    </Router>
  ),
  document.getElementById("root")!
);
