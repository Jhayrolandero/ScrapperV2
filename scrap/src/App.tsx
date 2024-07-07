import { useState } from "react"
import axios from "axios"

function App() {


  const [num, setNum] = useState(undefined)
  function search(e: any) {
    e.preventDefault()

    const form = new FormData()

    form.append("value", e.target.value)
    // const payload = Object.fromEntries(form)
    console.log(Object.fromEntries(form))
  
    // setNum(payload.query)
  }

  function postReq(e:any) {
    e.preventDefault()

    axios.post('http://localhost:5000/', {
      username: e.target.name.value,
      password: e.target.password.value
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  fetch("http://localhost:5000")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
  // http://localhost:5000
  return (
    <>
    <form onSubmit={postReq}>
      <label htmlFor="name">Username</label>
      <input name="name" />
      <label htmlFor="password">Password</label>
      <input name="password" type="password"/>
      <button type="submit">Search</button>
    </form>    
    </>
  )
}

export default App
