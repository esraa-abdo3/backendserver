
import  { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { FaUser, FaHome } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import imglogo from "../assets/logo copy1.png"
import Logout from "../webpages/Auth/Logout";
import axios from "axios";
import { BsCloudUpload } from "react-icons/bs";
import Cookies from "universal-cookie";
import { IoMdReturnLeft } from "react-icons/io";


export default function Sidebarprofile() {
    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const[role,setrole]=useState("")
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${gettoken}`
        };
        axios.get("http://localhost:5000/api/auth/profile", { headers })
            .then(response => {
                setrole(response.data.role);
            })
            .catch(error => {
                console.error('Error fetching profile', error);
            });
    }, [gettoken]);

    const toggleSidebar = () => {
        setIsSidebarActive(!isSidebarActive);
    };

    return (
        <>
           
            <div className="toggle-btn" onClick={toggleSidebar}>
                {isSidebarActive ? "X" : "☰"}
            </div>

          
            <div className={`sidebar ${isSidebarActive ? "active" : "rgba(73, 187, 189, 1)"}`}>
              
                    
                <div>
                    
          
                <div className="logo">
                    <img src={imglogo} alt="img" style={{maxWidth:"200px" ,maxHeight:"100px"}} />
                </div>
                <div className="info">
                    <div className="home">
                        <Link to="/Profileclient/profilehome">
                            <FaHome style={{ marginRight: "7px", color: "rgba(73, 187, 189, 1)" }} />
                            my Dashboard
                        </Link>
                        </div>
                        {role == "instructor" &&
                           <div className="uplode-course">
                           <Link to="/Profileclient/uploade">
                               < BsCloudUpload style={{ marginRight: "7px", color: "rgba(73, 187, 189, 1)" }} />
                               uplode new course
                           </Link>
                           </div>}
                    <div className="account">
                        <Link to="/Profileclient/myaccount">
                            <FaUser style={{ marginRight: "7px", color: "rgba(73, 187, 189, 1)" }} />
                            my Account
                        </Link>
                    </div>
                    <div className="mycourses">
                        <Link to="/Profileclient/mycourses">
                            <MdOutlineOndemandVideo style={{ marginRight: "7px", color: "rgba(73, 187, 189, 1)" }} />
                            my courses
                        </Link>
                        
                        </div>
                        <div className="mycourses">
                        <Link to="/">
                      
                            <IoMdReturnLeft  style={{ marginRight: "7px", color: "rgba(73, 187, 189, 1)" }} />
                           Return Home
                        </Link>
                        
                        </div>
                       
                    </div>
                    </div>

                
                <Logout/>
            </div>
        </>
    );
}





