
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { useEffect } from "react";

export default function RequierAuth() {
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer"); 
    const location = useLocation();


    useEffect(() => {
        window.history.pushState(null, null, window.location.href); 
        window.addEventListener("popstate", () => {
            window.history.pushState(null, null, window.location.href);
        });
    }, []);

    
    return gettoken ? (
        <Outlet /> 
    ) : (
        <Navigate to="/Auth/login" state={{ from: location }} replace /> 
    );
}
