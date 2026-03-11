import "./Login.css"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

export default function Login(){

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {

    // ✅ ADMIN LOGIN
    if(username === "admin" && password === "1234567890"){
      localStorage.setItem("role","admin");
      localStorage.setItem("user","admin");
      navigate("/dashboard");
      return;
    }

    // ✅ USER LOGIN
    const userData = localStorage.getItem("user_"+username);

    if(userData){
      const user = JSON.parse(userData);

      if(user.password === password){
        localStorage.setItem("role","user");
        localStorage.setItem("user", username);
        navigate("/dashboard");
      }else{
        alert("Wrong Password");
      }

    }else{
      alert("User Not Found");
    }
  };

  return (
  <div className="login-page">
    <div className="login-box">

      <h3>
        <FaLock /> RD Management Login
      </h3>

      <form onSubmit={(e)=>{e.preventDefault(); login();}}>
        <input
          className="form-control mb-3"
          placeholder="Username / Aadhar"
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

          <button type="submit" className="btn btn-primary">
          Login
          </button>

          <button 
           type="button" 
                      className="btn btn-outline-secondary"
             onClick={()=>navigate("/signup")}
            >
                 New User Signup
            </button>

      </form>

    </div>
  </div>
);
}