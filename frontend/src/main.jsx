import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="fixed inset-0 z-[-2] bg-background bg-[radial-gradient(100%_50%_at_50%_0%,color-mix(in_oklch,var(--primary)_22%,transparent)_0%,transparent_55%)]" />
    <App />
  </StrictMode>,
);
