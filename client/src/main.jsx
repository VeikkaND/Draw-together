import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SocketContext from './util/socketContext.js'
import { io } from "socket.io-client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Room from './routes/Room.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: ":room",
    element: <Room />
  }
])

const socket = io("http://localhost:3000/")

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <SocketContext.Provider value={socket}>
    <RouterProvider router={router} />
  </SocketContext.Provider>
  
)
