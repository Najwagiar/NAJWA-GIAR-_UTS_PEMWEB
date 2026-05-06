import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function PrptectedRoute(){
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    // jika  isAuthenticated false, maka redirect ke halaman login
    if(!isAuthenticated){
        return<Navigate to="/login" replace />;
    }

    // Jika  isAuthenticated true, maka tender children
    return <Outlet/>;
}