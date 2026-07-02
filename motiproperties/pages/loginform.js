import {useState} from "react";
import {useRouter} from 'next/router'
import { NavBar } from "../components/navbar";
import Footer from "../components/footer";

export default function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ role, setRole] = useState("");
  
    // To programmatically change pages after submitting
    const router = useRouter();
    
    // Function to handle login 
    async function handleLogin(event) {

      event.preventDefault();
  
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
        credentials: 'include',
      });
  
      if (res.ok) {
        // if response is ok send the user to dashboard 
        router.push("/dashboard");
      } else {
        alert("Login failed");
      }
      
    }
  
    // For updating the input
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleRoleChange = (event) => {
        setRole(event.target.value);
    }
  
    return (

      <><div>
        <NavBar />
      </div>
      
      <div className="form-wrapper">
          <form className="form" onSubmit={handleLogin}>

            <h1>Login</h1>

            <input
              value={email}
              onChange={handleEmailChange}
              placeholder="Email" />

            <br />

            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password" />

            <br />

            <select value={role} onChange={handleRoleChange} required placeholder="Role">
              <option value="" defaultChecked>Select Role</option>
              <option value="tenant">Tenant</option>
              <option value="landlord">Landlord</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit">Login</button>

          </form>

        </div>
        
       <div>
          <Footer />
        </div>
        
        </>
    );
  }
  