import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import React from "react";
import "rsuite/dist/rsuite.min.css";

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(<App />);
