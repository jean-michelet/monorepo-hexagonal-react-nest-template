import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@/App";
import Layout from "@/layouts/layout";

import "@/index.css";

const rootDiv = document.getElementById("root");
const root = createRoot(rootDiv as Element);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
  </StrictMode>,
);
