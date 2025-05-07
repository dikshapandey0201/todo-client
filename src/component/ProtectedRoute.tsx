import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {isAuth: boolean;};

export default function ProtectedRoute({isAuth: isAuth}: ProtectedRouteProps) {
 const auth = isAuth;
 if (!auth) {
   return <Navigate to="/" />;
 }
 return <Outlet/>;
}