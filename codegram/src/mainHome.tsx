import "./App.css";
import Home from "./Components/Home";
import RecomendedUsers from "./Components/RecomendedUsers";
import Sidebar from "./Components/sidebar";

function MainHome() {

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
