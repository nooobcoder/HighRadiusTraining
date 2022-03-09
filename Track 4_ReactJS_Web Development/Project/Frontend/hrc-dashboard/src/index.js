import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Using the new React 18 Root API (https://github.com/reactwg/react-18/discussions/5)
const container = document.getElementById("root");
createRoot(container).render(<App />);
