import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import Dashboard from "./pages/teacher/Dashboard";
import AuthForm from "./pages/auth/Authform";
import Loading from "./components/Loading";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ViewAdminLessonPlan from "./pages/admin/ViewAdminLessonPlan";
import SubView from "./components/quatersub/subview";
import QuarterView from "./components/quaterview/quaterview";
import Layout from "./layout";
import QuarterlyView from "./pages/admin/QuarterlyView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Loading>
              <AuthForm />
            </Loading>
          }
        />
        <Route path="/auth" element={<AuthForm />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subview" element={<SubView />} />
          <Route path="/quaterview" element={<QuarterView />} />
        </Route>

        {/*public route paning duha eh sulod lang nis protected inig ma human nkas role*/}

        <Route path="/layout" element={<Layout />}>
          <Route path="admin" element={<AdminDashboard />}></Route>
          <Route path="view" element={<ViewAdminLessonPlan />}></Route>
          <Route path="quarter/:quarter" element={<QuarterlyView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
