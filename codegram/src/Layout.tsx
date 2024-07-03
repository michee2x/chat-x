import { Outlet } from 'react-router-dom';
import Sidebar from './Components/sidebar';
import RecomendedUsers from './Components/RecomendedUsers';
import { SideBarContext } from "./showSideBar";
import {MdMenu} from "react-icons/md"

const Layout = () => {
  const { showSideBar, setshowSideBar } = SideBarContext();
  return (
    <>
      <div className="flex relative overflow-y-hidden w-screen h-screen">
        <Sidebar/>
        <div
          className="w-14 h-14 z-40 rounded-full bg-blue-400 border-2 border-white fixed grid place-items-center lg:hidden"
          style={{ top: "5%", left: "1.2%" }}
          onClick={() => setshowSideBar(true)}
        ><MdMenu className="text-[2rem] text-white/80" /></div>
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