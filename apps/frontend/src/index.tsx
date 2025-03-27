import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AppRouter from "@/app/app-router";

import "@/index.css";

const rootDiv = document.getElementById("root");
const root = createRoot(rootDiv as Element);


root.render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
