import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Home from './Home.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { BrowserRouter } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />
//   },
//   {
//     path: '/home',
//     element: <Home />
//   }
// ])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    {/* <App /> */}
    {/* <RouterProvider router={router}/> */}
    {/* <App /> */}
  </React.StrictMode>,
)
