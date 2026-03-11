import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function Signup(){

  const [show,setShow] = useState(false);
  const [accepted,setAccepted] = useState(false);
  const [aadhar,setAadhar] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {

    if(!accepted){
      alert("Please Accept Terms & Conditions");
      return;
    }

    // default password
    const user = {
      aadhar: aadhar,
      password: "123456789"
    };

    localStorage.setItem("user_"+aadhar, JSON.stringify(user));

    alert("Account Created Successfully");
    navigate("/");
  };

  return(
    <div className="container mt-5">

      <h3>New RD User Signup</h3>

      <input
        type="number"
        className="form-control mb-3"
        placeholder="Enter Aadhar Number"
        onChange={(e)=>setAadhar(e.target.value)}
      />

      <Button variant="info" onClick={()=>setShow(true)}>
        View Terms & Conditions
      </Button>

      <div className="form-check mt-3">
        <input
          type="checkbox"
          className="form-check-input"
          checked={accepted}
          onChange={(e)=>setAccepted(e.target.checked)}
        />
        <label className="form-check-label">
          I Accept Terms & Conditions
        </label>
      </div>

      <Button className="mt-3" onClick={handleSignup}>
        Signup
      </Button>

      {/* TERMS MODAL */}
      <Modal show={show} onHide={()=>setShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>नियम व अटी</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{whiteSpace:"pre-line"}}>
{`आर.डी. ची पूर्ण रक्कम फक्त १२ महिने पूर्ण झाल्यावरच मिळेल.
मध्यंतरी बंद केल्यास ४०% पर्यंत कपात होऊ शकते.
दोन जामीनदार आवश्यक.
RD 1000 → Loan 10000
RD 2000 → Loan 20000
RD 3000 → Loan 30000-40000`}
        </Modal.Body>
      </Modal>

    </div>
  )
}