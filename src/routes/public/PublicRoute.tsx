import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
  const token = localStorage.getItem("auth")

  if (token) {
    return <Navigate to={ "/" } />;
  }

  return <Outlet />;
}
export default PublicRoute;
