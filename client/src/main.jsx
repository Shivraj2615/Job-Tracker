import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { JobsProvider } from "./context/JobsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <JobsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </JobsProvider>
  </AuthProvider>,
);
