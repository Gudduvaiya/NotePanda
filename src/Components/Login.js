import React from "react";
import {useState} from 'react'
import { useHistory } from "react-router-dom";

function Login(props) {

const history=useHistory()
const [credentials, setcredentials] = useState({email:"",password:""})

    const submiton=async (event)=>{
        event.preventDefault()
        
        const response=await fetch("http://localhost:4000/api/Auth/login",{
            method:"POST",
            headers:{
                "content-Type":"application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        })
        const json= await response.json()
        console.log(json)
        localStorage.setItem('token', json.authtoken)
        history.push("/")
        props.showAlert("Logged In Successfully","success")
    }

    //Define liveconsole
const liveconsole=(event)=>{
    setcredentials({...credentials, [event.target.name]: event.target.value})
    }
  return (
    <div>
      <form onSubmit={submiton}>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={credentials.email}
            onChange={liveconsole}
          />
        </div>
        <div class="form-group my-2">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={liveconsole}
          />
        </div>
        <button type="submit" class="btn btn-primary my-2" >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
