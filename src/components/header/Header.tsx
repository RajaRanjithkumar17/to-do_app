import { Avatar, Button } from "antd";
import "./header.css"
import { clearAuthentication } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const ignoredRoutes = ["/login" ];
    const userName =localStorage.getItem("username") 

    
    if (ignoredRoutes.includes(location.pathname)) {
        return null;
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.setItem("auth",'')
        navigate('/login')
        dispatch(clearAuthentication())
    }  
  return (
    <div className="header flex justify-between w-full items-center">
       
        <h1 className="capitalize flex items-center text-[#595959] font-bold">  <Avatar className="capitalize ml-3" style={{ backgroundColor: '#d34a7c' }} >{userName?.charAt(0)}</Avatar> <p className="capitalize ml-3">{userName}</p></h1> 
     
      <div className="flex w-1/2 justify-end items-center">
        <p className="cursor-pointer logout-icon text-sm  mr-10" onClick={handleLogout}>
          <span className="material-symbols-outlined mt-2 text-[#d34a7c]  ">logout</span>
          <span className="align-super mt-2 ml-2">Logout</span>
        </p>
     
      </div>
    </div>
  );
};

export default Header;
