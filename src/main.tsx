import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/Otus_Lesson_31_Base">
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>,
);
