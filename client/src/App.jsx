import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PublicRoute from "./routes/PublicRoute";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import AddJob from "./components/jobs/AddJob";
import JobTable from "./components/jobs/JobTable";
import Dashboard from "./pages/DashBoard";

export default function App() {
  return (
    <div className="appContainer">
      <Navbar />

      <main className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/jobs" element={<JobTable />} />
            <Route path="/jobs/add" element={<AddJob />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
