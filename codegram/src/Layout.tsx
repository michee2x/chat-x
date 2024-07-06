import { Outlet } from 'react-router-dom';
import Sidebar from './Components/sidebar';
import RecomendedUsers from './Components/RecomendedUsers';
import { SideBarContext } from "./showSideBar";
import {FaPlus} from "react-icons/fa"

const Layout = () => {
  const { showSideBar, setshowSideBar } = SideBarContext();
  return (
    <>
      <div className="flex relative overflow-y-hidden w-screen h-screen">
        <Sidebar/>
        <div
          className="w-14 h-14 z-40 rounded-full bg-gradient-to-tr from-blue-600 via-blue-600 to-blue-300 bottom-8 right-4 border-2 border-white fixed grid place-items-center lg:hidden"
          onClick={() => setshowSideBar(true)}
        ><FaPlus className="text-[2rem] text-white/80" /></div>
        <div onClick={() => setshowSideBar(false)} className={`w-screen absolute ${showSideBar ? "block bg-black" : "hidden"} h-screen bg-transparent z-40`}></div>
      
        <div className="bg-gray-300" style={{ width: "70%" }}>
          <Outlet/>
        </div>

        <RecomendedUsers />
      </div>
    </>
  );
}

export default Layout