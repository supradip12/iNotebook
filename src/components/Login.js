import React ,{useState} from 'react'
import { useHistory } from 'react-router-dom'

export const Login = (props) => {

 const [credentials, setCredentials] = useState({email: "", password: ""})
 let history = useHistory();
 const handelSubmit = async (e)=>{
  e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
    console.log(json)

       if (json.success){
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken); 
        props.showAlert("Account Created","success");
        history.push("/");

    }
    else{
        alert("Invalid credentials");
        props.showAlert("Access Denied","danger");
    }
 }
 const onChange = (e)=>{
  setCredentials({...credentials, [e.target.name]: e.target.value})
}

 return (
  <div>
   I am Login
   <form onSubmit={handelSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' id="password"/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
  </div>
 )
}
