import { Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Dashboard from "../pages/Dashboard";
import AllApplications from "../pages/AllApplications";
import AddApplication from "../pages/AddApplication";
import Interviews from "../pages/Interviews";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import ApplicationDetails from "../pages/ApplicationDetails";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="applications" element={<AllApplications />} />
        <Route path="applications/:id" element={<ApplicationDetails />} />
        <Route path="applications/:id/edit" element={<AddApplication />} />
        <Route path="add-application" element={<AddApplication />} />
        <Route path="interviews" element={<Interviews />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
