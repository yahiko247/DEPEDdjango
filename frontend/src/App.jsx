import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./auth/protectelement";
import Dashboard from "./pages/dashboard";
import AuthForm from "./auth/authform";
import Loading from "./components/spinloader";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<AdminDashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
