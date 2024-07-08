import { useState, useEffect } from "react";
import {
  MdLogout,
  MdHome,
  MdPostAdd,
  MdNotifications,
  MdPerson,
  MdBookmark,
} from "react-icons/md";
import { Link, Navigate } from "react-router-dom";
import { logOut } from "../hooks/likepost";
import { getloggedUser } from "../hooks/likepost";
import { SideBarContext } from "../showSideBar";
import { BsPerson } from "react-icons/bs";

const MainNav = () => {
  const [user, setUser] = useState<any>([]);
  const [nav, setNav] = useState(false);
  const {setshowSideBar } = SideBarContext();

  useEffect(() => {
    getloggedUser(setUser);
  }, []);
  const [state, setState] = useState("home");
  const [categories] = useState([
    { name: <MdHome />, state: "home", url: "/" },
    { name: <MdPostAdd />, state: "post", url: "/comment" },
    { name: <MdNotifications />, state: "notifications", url: "/notifications" },
    { name: <MdPerson size={30} />, state: "profile", url: "/profile/id" },
    { name: <MdBookmark size={30} />, state: "bookmarks", url: "/bookmark" },
  ]);

  if (nav) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      {categories.map((cat: any, index) => {
        return (
          <Link
            to={cat.url}
            key={index}
            className={`cursor-pointer`}
            onClick={() => {
              setState(cat.state);
              setshowSideBar(false);
            }}
          >
            <div
              key={cat.name}
              className={`text-accent ${
                state === cat.state
                  ? "lg:bg-purple-600 lg:ml-[2rem] lg:mr-[5rem] lg:px-3 lg:py-2 lg:rounded-lg"
                  : ""
              } gap-2 flex items-center pl-[2rem]`}
            >
              <span className="text-md text-blue-200">{cat.name}</span>
              <span className="text-md text-white">{cat.state}</span>
            </div>
          </Link>
        );
      })}
      <div
        className="flex items-center cursor-pointer gap-2 pl-[2rem]"
        onClick={async () => {
          await logOut();
          setNav(true);
          setshowSideBar(false);
        }}
      >
        {user?.profilepic ? (
          <img
            src={user?.profilepic}
            alt="img"
            className="w-10 h-10 rounded-full border-2 border-blue-900"
          />
        ) : (
          <span
            className="flex justify-center items-center
               rounded-full w-10 h-10 bg-primary"
          >
            <BsPerson className="text-3xl text-white" />{" "}
          </span>
        )}
        <span>
          <MdLogout />
        </span>
      </div>
    </>
  );
};

export default MainNav;
