import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
export default function Logout() {
    const cookie = new Cookies();
    const navigate = useNavigate();
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const gettoken = cookie.get("Bearer");
    async function handlelogout() {
        const headers = {
            Authorization: `Bearer ${gettoken}` 
        };
        try {
            
            await axios.post(`http://localhost:5000/api/auth/logout`, {}, { headers });
            cookie.remove("Bearer");
            setIsLoggedOut(true);    
        } catch (error) {
            console.log("Error logging out:", error);
        }
    }

    useEffect(() => {
        if (isLoggedOut) {
         
            navigate("/Auth/login", { replace: true }); 
        }
    }, [isLoggedOut, navigate]);

   
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.addEventListener("popstate", () => {
            window.history.pushState(null, null, window.location.href);
        });
    }, []);

    return (
        <button onClick={handlelogout} style={{ color: "#616161", fontSize: '20px', border: 'none' }}>
            Log out
        </button>
    );
}
