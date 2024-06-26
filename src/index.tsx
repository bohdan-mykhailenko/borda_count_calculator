import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { ChakraProvider } from "./providers/chakra/chakraProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
