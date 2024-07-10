// Components
import Login from "./Login"
function App() {

  const key = "BIU_udvoeMKlrJ2hjx_j7_9w91Xlgd-HVw7-MBPgs7019CGtRXBbtnVrkhM9DQ8HSd4V8XYRFqi8ADJzSTfKxbU"
  function notif() {
    Notification.requestPermission().then(x => {
      if(x === 'granted') {
        new Notification("Hello")
      }
    })
  }

  function check () {

    if(!("serviceWorker" in navigator)){
      alert("Service Worker is not supported")
      return
    }

    try {
      send()
    } catch(err) {
      console.log(err)
    }

    // send().catch(err => console.log(err))
    // console.log("serviceWorker" in navigator)
    // const test = navigator. 
  }

  async function send() {
    // Checker of servive
    const register = await navigator.serviceWorker.register("./sw.js", {scope: "/"})
    console.log("Registered")

    // Register push
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(key)
    })

    await fetch("http://localhost:5000", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "content-type": "application/json"
      }
    }).catch(err => console.log(err))
  }

  function urlBase64ToUint8Array(base64String : string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  return (
    <>
    <button onClick={check}>Push</button>
    <div className="w-full h-screen flex justify-center items-center">
      <Login />
    </div>
    </>
  )
}

export default App
