import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./hooks/store.js";
// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// We'll create a custom.css file for any essential styles we need to keep
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
