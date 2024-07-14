import { useState } from "react"
import axios, { AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"
// import { AuthContext } from "./App"


interface message {
  msg: string,
  token: string
}

export default function Login({onAuth} : {onAuth: (val: boolean) => void}) {
    // const [isAuth, setAuth] = useContext(AuthContext)
    const [msg, setMsg] = useState('')
    const navigate = useNavigate();

    function postReq(e:any) {
      e.preventDefault()
  
      axios.post('http://localhost:5000/login', {
        username: e.target.name.value,
        password: e.target.password.value,
        subscribe: e.target.sub.checked
      })
      .then(function (response: AxiosResponse<message, any>) {
        const res = response.data
        setMsg(res.msg);
        
        if(res.msg === "Logged In!") {
          document.cookie = `token=${res.token}` 
          onAuth(true)
          // setAuth(true)
          navigate("/home")
        }

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
