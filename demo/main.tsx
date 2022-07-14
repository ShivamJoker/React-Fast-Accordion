import React, { StrictMode } from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");

if (!container) {
  document.body.innerHTML = "<h1>Something horrible happened</h1>";
  throw Error("root not found");
}
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
