import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AppProvider } from "./provider/index.ts";

createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AppProvider>
);
