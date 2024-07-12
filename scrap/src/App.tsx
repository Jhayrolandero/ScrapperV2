// Components
import { useEffect } from "react"
import Login from "./Login"
function App() {

  const key = "BIU_udvoeMKlrJ2hjx_j7_9w91Xlgd-HVw7-MBPgs7019CGtRXBbtnVrkhM9DQ8HSd4V8XYRFqi8ADJzSTfKxbU"

  async function send() {
    // Checker of servive
    navigator.serviceWorker.register("./sw.js")
    

    navigator.serviceWorker.ready
    .then((register) => {
      console.log("Registered......")
      return register.pushManager.getSubscription()
      .then(async (subscription) => {
        if(subscription) {
          console.log("ALready Sub")
          return subscription
        }
        console.log("Subscribing")

        return register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(key)
        })
      })
      .catch((err) => {
        console.error(err)
      })
    })
    .then((subscription) => {
      console.log("Sub......")
      fetch("http://localhost:5000", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "content-type": "application/json"
        }
      }).catch(err => console.log(err))
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {

    console.log("Init")
    if(!("serviceWorker" in navigator)){
      alert("Service Worker is not supported")
      return
    }

    send().catch(err => console.log(err))
  }, [])
  

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
    <div className="w-full h-screen flex justify-center items-center">
      <Login />
      <small>By default the site doesn't store your credentials</small>
    </div>
    </>
  )
}

export default App
