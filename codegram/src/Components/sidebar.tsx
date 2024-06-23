import { SideBarContext } from '../showSideBar';
import MainNav from './mainNav';

const sidebar = () => {
  const {showSideBar} = SideBarContext()

 
  return (
    <div className={`h-screen transition-all duration-500 ${!showSideBar ? "invisible w-0" : "visible w-1/2"} overflow-x-hidden absolute z-50 pt-[2rem]  bg-black text-gray-200 text-lg flex-col flex gap-[5rem] lg:w-[25%] lg:relative lg:visible`}>
     <MainNav />
      
    </div>
  );
};

export default sidebar
