import "./Join.css"
import logo from '../../assets/react.svg'
import {Link} from "react-router-dom"
import { useState } from "react";

let user;
function Join() {

  const [name, setName] = useState("")

  const sendUser = () => {
    user = name;
    setName("");
  }
  return (
    <>
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>Chat <span className="span">Room</span> </h1>
        <input type="text" id="JoinInput" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)}/>
        <Link onClick={(e) => !name ? e.preventDefault() : null} to="/chat"> <button onClick={sendUser} className="joinbtn">Log In</button></Link>
      </div>
    </div>
    </>
  )
}

export default Join;
export {user};
