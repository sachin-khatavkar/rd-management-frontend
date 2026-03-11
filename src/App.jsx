import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Rduser from "./Rduser";
import Signup from "./Signup";

export default function App(){
  return(
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Rduser />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}



