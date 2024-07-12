import { useState } from "react"
import axios, { AxiosResponse } from "axios"

interface message {
  msg: string
}

export default function Login() {
    const [msg, setMsg] = useState("")
  
    function postReq(e:any) {
      e.preventDefault()
  
      axios.post('http://localhost:5000/login', {
        username: e.target.name.value,
        password: e.target.password.value,
        subscribe: e.target.sub.checked
      })
      .then(function (response: AxiosResponse<message, any>) {
        setMsg(response.data.msg);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
    fetch("http://localhost:5000")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  
  return (
    <div className="p-5 bg-slate-50 shadow-md rounded-md flex flex-col">
    <div>{msg}</div>
    <form onSubmit={postReq} className="flex flex-col">
      <label htmlFor="name">Username</label>
      <input name="name" />
      <label htmlFor="password">Password</label>
      <input name="password"/>
      <label htmlFor="sub">
        <p>Notification</p> 
        <strong>By subscribing to notifications you entrust the site with your credentials</strong>
      </label>
      <input type="checkbox" name="sub"/>
      <button type="submit">Login</button>
    </form>    
    </div>
  )
}
