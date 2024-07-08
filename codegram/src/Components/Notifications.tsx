import { useEffect, useState } from 'react'
import { deletenotification, getloggedUser, getnotifications } from '../hooks/likepost'
import {MdDelete} from "react-icons/md"
import {BsPerson} from "react-icons/bs"
import { SideBarContext } from "../showSideBar";

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [user, setUser] = useState<any>([])
  const {setshowSideBar } = SideBarContext();

  useEffect(() => {
    getnotifications(setNotifications)
    getloggedUser(setUser)
  }, [])

  return (
    <>
      <div className="w-screen h-screen bg-black overflow-y-scroll lg:w-full">
        <div
          className={`flex justify-between items-center px-3 py-2 bg-black text-gray-300`}
        >
          <div className="flex p-2 items-center justify-between gap-3 w-full h-full">
            <img
              src={user?.profilepic}
              onClick={() => setshowSideBar(true)}
              alt=""
              className="w-8 h-8 rounded-full border-2 border-blue-900"
            />{" "}
            <h2>Notifications</h2>
          </div>
        </div>
        <div className={`w-full ${notifications.length === 0 ? "hidden" : "block"} h-full bg-black text-white mt-5`}>
          {
            notifications.map((e: any) => {
              return (
                <div
                  className={`flex bg-black py-2 w-full h-auto items-center 
                  justify-between border-b-2 border-gray-800  ${
                    !notifications ? "hidden" : "block"
                  } `}
                >
                  <div className="flex mx-5 items-center gap-3 w-1/2 h-full">
                    {!e?.from?.profilepic ? (
                      <span
                        className="flex justify-center items-center
               rounded-full w-8 h-8 bg-blue-900 lg:h-12lg:w-12"
                      >
                        <BsPerson className="text-2xl text-white lg:4xl" />{" "}
                      </span>
                    ) : (
                      <img
                        src={e?.from?.profilepic}
                        alt="img"
                        className="block rounded-full h-10 w-10"
                      />
                    )}
                    <div className="text-sm">{`${e?.from?.name === user.name ? "you" : e?.from?.name} liked your post`}</div>
                  </div>
                  <div className="w-16 cursor-pointer h-16 grid place-items-center">
                    <MdDelete
                      className="text-red-400 hover:text-2xl"
                      onClick={() =>
                        deletenotification(setNotifications, e._id)
                      }
                    />
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className={`w-full text-lg text-accent h-full grid place-items-center ${notifications.length === 0 ? "block" : "hidden"}`}>
          no notifications found
        </div>
      </div>
    </>
  );
}

export default Notifications