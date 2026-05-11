import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SchoolYearProvider } from "./context/SchoolYearProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SchoolYearProvider>
        <App />
      </SchoolYearProvider>
    </AuthProvider>
  </StrictMode>,
);
