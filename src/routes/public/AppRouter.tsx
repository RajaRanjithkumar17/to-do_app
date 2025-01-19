import { Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import Login from "../../page/login/Login";
import ProtectedRoute from "../private/ProtectedRoute";
import Dashboard from "../../page/dashboard/Dashboard";
import CreateTask from "../../page/task/CreateTask";
import PageNotFound from "../../page/page-notfound/PageNotFound";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Protected Route */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<CreateTask />} />
        <Route path="/tasks/:id" element={<CreateTask />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRouter;
