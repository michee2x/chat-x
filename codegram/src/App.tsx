import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom"
import Post from './Components/Post'
import Comment from './Components/Comment'
import Home from './Components/Home'
import Notifications from './Components/Notifications'
import RecomendedUsers from './Components/RecomendedUsers'
import Sidebar from './Components/sidebar'
import Login from './Components/Login'
import Signup from './Components/Signup'
import MainHome from './mainHome'
import { AuthContext } from './authContext'
import { useNavigate , Navigate} from 'react-router-dom'
import Layout from './Layout'
import { useQuery } from '@tanstack/react-query'
import Profile from './Components/Profile'
import EditProfile from './Components/EditProfile'
import MainNav from './Components/mainNav'
import BookMark from './Components/bookmark'

function App() {
  const [count, setCount] = useState(0)
  const {loggedUser} = AuthContext()

  return (
    <>
      <div className="flex overflow-y-hidden w-screen h-screen">
        <div className="bg-gray-300" style={{ width: "60%" }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/comment" element={<Comment />} />
                <Route
                  path="/profile/id/editproile"
                  element={<EditProfile />}
                />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="profile" element={<Profile />} />
                <Route path="/bookmark" element={<BookMark />} />
                <Route path="/post/:id/:from" element={<Post />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App
