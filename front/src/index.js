import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const DEV = false;

const host = DEV ? "http://localhost:3000/" : "/";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App host={host} />);
