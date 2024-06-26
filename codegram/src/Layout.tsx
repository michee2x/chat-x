import { Outlet } from 'react-router-dom';
import Sidebar from './Components/sidebar';
import RecomendedUsers from './Components/RecomendedUsers';
import { SideBarContext } from "./showSideBar";

const Layout = () => {
  const { showSideBar, setshowSideBar } = SideBarContext();
  return (
    <>
      <div className="flex relative overflow-y-hidden w-screen h-screen">
        <Sidebar/>
        <div
          className="w-12 h-12 z-40 rounded-full bg-blue-600 border-4 border-white fixed lg:hidden"
          style={{ top: "50%", left: "-5.5%" }}
          onClick={() => setshowSideBar(true)}
        ></div>
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