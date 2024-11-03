import { Link } from "react-router-dom";
import "./Profilehome.css";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import CourseHistory from "./CourseHistory";
export default function Homeprofile() {
    const [courses, setCourses] = useState([]);
    const cookies = new Cookies();
    const userId = cookies.get("userId");
    const token = cookies.get("Bearer");

    const [name,setname]=useState("")
   
    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${token}`
        };

        axios.get("http://localhost:5000/api/auth/profile", { headers })
            .then(response => {
                const data = response.data;
           
                setname(response.data.username)
            
       
            })
            .catch(error => {
                console.error('Error fetching profile', error);
            });
    }, [token]);
    


    return (
        <>
        
            <div className="flexb">
            
            <div className="home-landing">
            <div className="text">
                <h3>We’re glad you’re back, { name} ! Let’s make today productive</h3>
                <button className="explore-now">
                    <Link to="/courses" className="link">Explore Now Courses</Link>
                </button>
            </div>
       
           
                </div>
    
            <CourseHistory/>
            </div>
        
       
        </>

    );
}
