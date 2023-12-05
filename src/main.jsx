import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter
      basename={
        import.meta.env.DEV ? "/" : "/react-vite-rest-post-app-with-auth/"
      }
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
