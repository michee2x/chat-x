import './App.css'
import {BrowserRouter,Route, Routes} from "react-router-dom"
import Comment from './Components/Comment'
import Home from './Components/Home'
import Notifications from './Components/Notifications'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Layout from './Layout'
import Profile from './Components/Profile'
import EditProfile from './Components/EditProfile'
import BookMark from './Components/bookmark'

function App() {

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
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/bookmark" element={<BookMark />} />
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
