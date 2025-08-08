import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/Layout/AppLayout";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/user/Dashboard";
import { AdminDashboard } from "./pages/organization/AdminDashboard";
import { About } from "./pages/About";
import { FAQ } from "./pages/FAQ";
import { Blog } from "./pages/Blog";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="organization-dashboard" element={<AdminDashboard />} />
            <Route path="about" element={<About />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="blog" element={<Blog />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
