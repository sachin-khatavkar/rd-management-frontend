import axios from 'axios';
import {useState,useEffect} from'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaRegAddressBook } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

export default function Rduser(){
    const[cs,setCs]=useState([])
    const[pcs,setPCs]=useState([])
    // -------- ADD MODAL STATE --------
  const [show, setShow] = useState(false);

  // ================= ADD MODAL HANDLERS =================
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //update

 // -------- UPDATE MODAL STATE --------
  const [ushow, setUShow] = useState(false);

 // ================= UPDATE MODAL HANDLERS =================
  const handleUShow = () => setUShow(true);
  const handleUClose = () => setUShow(false);

  // -------- Passbook MODAL STATE --------
  const [pshow, setPShow] = useState(false);

 // ================= Passbook MODAL HANDLERS =================
  const handlePShow = () => setPShow(true);
  const handlePClose = () => setPShow(false); 

   // -------- Passbook Entry MODAL STATE --------
  const [peshow, setPeShow] = useState(false);

 // ================= Passbook Entry MODAL HANDLERS =================
  const handlePeShow = () => setPeShow(true);
  const handlePeClose = () => setPeShow(false); 


const [rid, setRid] = useState(0);    
const [nm, setName] = useState('');
const [adr, setAdr] = useState('');
const [dob, setDob] = useState('');
const [gen, setGender] = useState('');
const [rdt, setRdDate] = useState('');
const [rdamt, setRamt] = useState('');
const [ocp, setOcp] = useState('');
const [acno, setAcno] = useState('');
const [adhno, setAdhno] = useState('');
const [pnno, setPnno] = useState('');
const [nnm, setNname] = useState('');
const [nadr, setNAdr] = useState('');
const [nadhno, setNAdhno] = useState('');
const [npnno, setNPnno] = useState('');
const [ldt, setLtd] = useState('');
const [fmt, setFmt] = useState('');
const [rnm, setRnm] = useState(''); // ✅ ADD THIS


const getnm = (e) => { setName(e.target.value)}
const getadr = (e) => { setAdr(e.target.value)}
const getdob = (e) => { setDob(e.target.value)}
const getgen = (e) => { setGender(e.target.value)}
const getrdt = (e) => { setRdDate(e.target.value)}
const getrdamt = (e) => { setRamt(e.target.value)}
const getocp = (e) => { setOcp(e.target.value)}
const getacno = (e) => { setAcno(e.target.value)}
const getadhno = (e) => { setAdhno(e.target.value)}
const getpnno = (e) => { setPnno(e.target.value)}
const getnnm = (e) => { setNname(e.target.value)}
const getnadr = (e) => { setNAdr(e.target.value)}
const getnadhno = (e) => { setNAdhno(e.target.value)}
const getnpnno = (e) => { setNPnno(e.target.value)}

//passbook
const Pgetrdt = (e) => { setRdDate(e.target.value)}
const Pgetrdamt = (e) => { setRamt(e.target.value)}
const Prid = (e) => { setRid(e.target.value)}
const Pgetldt = (e) => { setLtd(e.target.value)}
const Pgetfmt = (e) => { setFmt(e.target.value)}

//update
const ugetnm = (e) => { setName(e.target.value)}
const ugetadr = (e) => { setAdr(e.target.value)}
const ugetdob = (e) => { setDob(e.target.value)}
const ugetgen = (e) => { setGender(e.target.value)}
const ugetrdt = (e) => { setRdDate(e.target.value)}
const ugetrdamt = (e) => { setRamt(e.target.value)}
const ugetocp = (e) => { setOcp(e.target.value)}
const ugetacno = (e) => { setAcno(e.target.value)}
const ugetadhno = (e) => { setAdhno(e.target.value)}
const ugetpnno = (e) => { setPnno(e.target.value)}
const ugetnnm = (e) => { setNname(e.target.value)}
const ugetnadr = (e) => { setNAdr(e.target.value)}
const ugetnadhno = (e) => { setNAdhno(e.target.value)}
const ugetnpnno = (e) => { setNPnno(e.target.value)}

function getPentry(rid, rnm){
   setRid(rid);
   setRnm(rnm);        // ✅ CORRECT
   handlePeShow();
   Pentry(rid);
}

function getId(
  rid,
  acno,
  addr,
  adharno,
  dob,
  gender,
  name,
  occupation,
  panno,
  rdamt,
  rddate
) {

  setRid(rid);
  setAcno(acno);
  setAdr(addr);
  setAdhno(adharno);
  setDob(dob);
  setGender(gender);
  setName(name);
  setOcp(occupation);
  setPnno(panno);
  setRamt(rdamt);
  setRdDate(rddate);

  handleUShow(); // STEP 2 fix already applied
}


 const psave = () => {
  const dt = {
    
    famt: fmt,
    lag: 0,
    lday: ldt,
    rdamt: rdamt,
    rddate: rdt,
    rid: rid
  };
 axios.post("http://localhost:8080/psave", dt)
      .then(res => {
        alert("Success");
        rduser();          // table refresh
        setPShow(false); // modal close
      })
  };

 const Pentry = (id) => {

  axios.get("http://localhost:8080/passbookById/" + id)
    .then(res => {
      setPCs(res.data)
      console.log(res.data)
      let sm=0;
      let r=0;
      for (let i=0;i<pcs.length;i++){
        r=Number(res.data.rdamt);
        console.log("rrrrrrr:"+r)
        sm=sm+Number(res.data.r);

      }
      console.log("ramt:"+sm)
    })
}


  const del = (id) => {

  axios.delete("http://localhost:8080/dlt/" + id)
    .then(res => {
      
      // STEP 1: correct status check
      if(res.status === 200){
        alert("Delete Success");
        rduser();   // table refresh
      } else {
        alert("Delete Fail");
      }

    })
}

const update = () => {
  const dt = {
    acno: acno,
    addr: adr,
    adharno: adhno,
    dob: dob,
    gender: gen,
    naddr: nadr,
    nadharno: nadhno,
    name: nm,
    nname: nnm,
    npanno: npnno,
    occupation: ocp,
    panno: pnno,
    rdamt: rdamt,
    rddate: rdt,
    rid: rid
  };

 axios.put("http://localhost:8080/updt", dt)
      .then(res => {
        alert("Success");
        rduser();          // table refresh
        setUShow(false); // modal close
      })
  };

const save = () => {
  const dt = {
    acno: acno,
    addr: adr,
    adharno: adhno,
    dob: dob,
    gender: gen,
    naddr: nadr,
    nadharno: nadhno,
    name: nm,
    nname: nnm,
    npanno: npnno,
    occupation: ocp,
    panno: pnno,
    rdamt: rdamt,
    rddate: rdt
  };


  

 axios.post("http://localhost:8080/save", dt)
      .then(res => {
        alert("Success");
        rduser();          // table refresh
        setUShow(false); // modal close
      })
  };

  
    const rduser=()=>{
        axios.get("http://localhost:8080/rduser")
        .then(res=>{
            console.log(res.data)
            setCs(res.data)
        })

    }

    useEffect(()=>{
        rduser();
    },[])
return (
  <>
    <div className="container mt-3">

      {/* ADD BUTTON */}
      <Button variant="primary" onClick={handleShow}>
        Add New RD user
      </Button>

      {/* ADD MODAL */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Rd User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control size="lg" value={nm} onChange={getnm} type="text"
          placeholder="Enter Name"/>
          <Form.Control size="lg" value={adr} onChange={getadr} type="text"
          placeholder="Enter Address"/>
          <Form.Control size="lg" value={dob} onChange={getdob} type="date"
          placeholder="Enter DOB"/>
          <Form.Control size="lg" value={gen} onChange={getgen} type="text"
          placeholder="Enter Gender"/>
          <Form.Control size="lg" value={rdt} onChange={getrdt} type="date"
          placeholder="Enter RD date"/>
          <Form.Control size="lg" value={rdamt} onChange={getrdamt} type="number"
          placeholder="Enter RD Amount"/>
          <Form.Control size="lg" value={ocp} onChange={getocp} type="text"
          placeholder="Enter Occupation"/>
          <Form.Control size="lg" value={acno} onChange={getacno} type="text"
          placeholder="Enter Account no"/>
          <Form.Control size="lg" value={adhno} onChange={getadhno} type="number"
          placeholder="Enter Aadhar No"/>
          <Form.Control size="lg" value={pnno} onChange={getpnno} type="text"
          placeholder="Enter Pan No"/>
          <Form.Control size="lg" value={nnm} onChange={getnnm} type="text"
          placeholder="Enter Nomination Name"/>
          <Form.Control size="lg" value={nadr} onChange={getnadr} type="text"
          placeholder="Enter Nomination Address"/>
          <Form.Control size="lg" value={nadhno} onChange={getnadhno} type="text"
          placeholder="Enter Nomination Aadhar No"/>
          <Form.Control size="lg" value={npnno} onChange={getnpnno}  type="text"
          placeholder="Enter Nomination Pan No"/>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={save}>
            Add RD User
          </Button>
        </Modal.Footer>
      </Modal>

{/* ================= UPDATE MODAL ================= */}
      <Modal show={ushow} onHide={handleUClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Rduser Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control size="lg"  value={nm} onChange={getnm} type="text"
          placeholder="Enter Name"/>
          <Form.Control size="lg" value={adr} onChange={getadr} type="text"
          placeholder="Enter Address"/>
          <Form.Control size="lg" value={dob} onChange={getdob} type="date"
          placeholder="Enter DOB"/>
          <Form.Control size="lg" value={gen} onChange={getgen} type="text"
          placeholder="Enter Gender"/>
          <Form.Control size="lg" value={rdt} onChange={getrdt} type="date"
          placeholder="Enter RD date"/>
          <Form.Control size="lg" value={rdamt} onChange={getrdamt} type="number"
          placeholder="Enter RD Amount"/>
          <Form.Control size="lg" value={ocp} onChange={getocp} type="text"
          placeholder="Enter Occupation"/>
          <Form.Control size="lg" value={acno} onChange={getacno} type="text"
          placeholder="Enter Account no"/>
          <Form.Control size="lg" value={adhno} onChange={getadhno} type="number"
          placeholder="Enter Aadhar No"/>
          <Form.Control size="lg" value={pnno} onChange={getpnno} type="text"
          placeholder="Enter Pan No"/>
          <Form.Control size="lg" value={nnm} onChange={getnnm} type="text"
          placeholder="Enter Nomination Name"/>
          <Form.Control size="lg" value={nadr} onChange={getnadr} type="text"
          placeholder="Enter Nomination Address"/>
          <Form.Control size="lg" value={nadhno} onChange={getnadhno} type="text"
          placeholder="Enter Nomination Aadhar No"/>
          <Form.Control size="lg" value={npnno} onChange={getnpnno}  type="text"
          placeholder="Enter Nomination Pan No"/>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUClose}>Close</Button>
         <Button variant="primary" onClick={update}>
  Update
</Button>
          
          
        </Modal.Footer>
      </Modal>

{/* Passbook Entry */}

{/* ADD MODAL */}
      <Modal show={pshow} onHide={handlePClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rd Passbook Entry</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control size="sm" readOnly= {true} value={rid} onChange={Prid} type="number"
          placeholder="RD User Id"/>
          <Form.Control size="sm" value={rdt} onChange={Pgetrdt} type="date"
          placeholder="Enter RD date"/>
          <Form.Control size="sm" value={rdamt} onChange={Pgetrdamt} type="number"
          placeholder="Enter RD Amount"/>
          <Form.Control size="sm" value={ldt} onChange={Pgetldt} type="number"
          placeholder="Late day"/>
          <Form.Control size="sm" value={fmt} onChange={Pgetfmt} type="number"
          placeholder="Fine Amount"/>
        </Modal.Body>

        
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePClose}>
            Close
          </Button>
          <Button variant="primary" onClick={psave}>
            Add Passbook Entry
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Passbook Entry */}

{/* ADD MODAL */}
      <Modal show={peshow} onHide={handlePeClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Rd Wise Passbook Entry</Modal.Title>
          
        </Modal.Header>

        <Modal.Body>
           <p>Id:{rid}{" | "}Name:{rnm}</p>
          {/* ================= TABLE ================= */}
      <table className="table table-dark mt-3">
        <thead>
          <tr>
            <th>Pid</th>
            <th>Rid</th>
            <th>RD Date</th>
            <th>RD Amount</th>
            <th>Late Days</th>
            <th>Fine Amount</th>
          </tr>
        </thead>

        <tbody>
          {pcs.map((item, i) => (
            <tr key={i}>
              <td>{item.pid}</td>
              <td>{item.rid}</td>
              <td>{item.rddate}</td>
              <td>{item.rdamt}</td>
              <td>{item.lday}</td>
              <td>{item.famt}</td>
        
            </tr>
          ))}
        </tbody>
      </table>
        </Modal.Body>

        
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePeClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* TABLE OUTSIDE MODAL */}
      <h2 className="mt-4">RD USER DATA</h2>

      <table className="table table-dark mt-3">
        <thead>
          <tr>
            <th>Rid</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Occu</th>
            <th>Acno</th>
            <th>Adharno</th>
            <th>PanNo</th>
            <th>Address</th>
            <th>Rd-Amt</th>
            <th>Rd-Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {cs.map((item) => (
  <tr key={item.rid}>   

              <td>{item.rid}</td>
              <td>{item.name}</td>
              <td>{item.gender}</td>
              <td>{item.dob}</td>
              <td>{item.occupation}</td>
              <td>{item.acno}</td>
              <td>{item.adharno}</td>
              <td>{item.panno}</td>
              <td>{item.addr}</td>
              <td>{item.rdamt}</td>
              <td>{item.rddate}</td>
              <td>
                <FaTrash title='Delete Rd user' color='Red' variant="danger" onClick={() => del(item.rid)}>Delete</FaTrash>{" "}
                <FaPencilAlt
  title="Update Rd user"
  style={{cursor:"pointer", color:"blue"}}
  onClick={() => getId(
    item.rid,
    item.acno,
    item.addr,
    item.adharno,
    item.dob,
    item.gender,
    item.name,
    item.occupation,
    item.panno,
    item.rdamt,
    item.rddate
  )}
/>


<FaRegAddressBook
  title="Passbook Entry"
  style={{cursor:"pointer", color:"green"}}
  onClick={() => {
    setRid(item.rid);   // id set karo
    handlePShow();      // modal open karo

    
  }}
  
/>
 <FaEye title=" View Passbook Entry" onClick={() => getPentry(item.rid,item.name,)}> </ FaEye >


              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  </>
);
}
