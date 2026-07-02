import { useState } from "react";
import { useRouter } from "next/router";
import { NavBar } from "../components/navbar";
import Footer from "../components/footer";

export default function Registering() {

  // The state holding our user info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // To programmatically change pages after submitting
  const router = useRouter();

  //Add a NEW user
  async function handleAdd(event) {
    //Prevents automatic default actions
    event.preventDefault();

    // Send the listed data to the API
    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    // UseRouter can then send the user direct to dashboard
    if (res.ok) {
      // Sends the user to the login page 
      router.push("/loginform");
    } else {
      alert("Registration failed");
    }
  }

  /// For updating the input
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    
    <>
      <div>
        <NavBar/>
      </div>

      <div className="form-wrapper">
        <form className="form" onSubmit={handleAdd}>

          <h1>Register as a new user</h1>

          <input 
            value={name} 
            onChange={handleNameChange} 
            placeholder="Name" 
          />
          <br />

          <input 
            value={email} 
            onChange={handleEmailChange} 
            placeholder="Email" 
          />
          <br />
          
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
          <br />

          <select 
            type="dropdown"  
            onChange={handleRoleChange} >
            <option value=""> Select a role</option>
            <option value="admin" >Admin</option>
            <option value="landlord">Landlord</option>
            <option value="tenant">Tenant</option> 
          </select>

          <br />

          <button type="submit">Register</button>

        </form>
       </div>

        <div>
          <Footer />
        </div>
    </>
  );
}
