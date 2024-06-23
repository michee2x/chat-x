import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Post from "./Components/Post";
import Comment from "./Components/Comment";
import Home from "./Components/Home";
import Notifications from "./Components/Notifications";
import RecomendedUsers from "./Components/RecomendedUsers";
import Sidebar from "./Components/sidebar";

function MainHome() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex overflow-y-hidden w-screen h-screen">
        <Sidebar />

        <div className="bg-gray-300" style={{ width: "60%" }}>
          <Home />
        </div>

        <RecomendedUsers />
      </div>
    </>
  );
}

export default MainHome;
