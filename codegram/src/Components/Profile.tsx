import {useEffect, useRef, useState} from 'react'
import {MdArrowBack, MdMenu, MdPerson, MdSearch, MdCancel } from "react-icons/md"
import { Link} from 'react-router-dom';
import { getProfile, getuserpost, getloggedUser } from '../hooks/likepost';
import PostComponent from './postComponent';
import { createdAt } from '../hooks/useCreatedHook';
 import { follow_unfollow_user } from "../hooks/likepost";
import ParPost from "./Post";
import { SideBarContext } from "../showSideBar";

const Profile = () => {
const [large, setLarge] = useState(false)
  const {setshowSideBar } = SideBarContext();
const [parPost, setParPost] = useState<any>({})
    const [user, setUser] = useState<any>([]);
    const [searchUsers, setSearchUsers] = useState(false)
    const [mainUser, setMainUser] = useState<any>({})
    const [post, setPost] = useState([])
    const searchRef = useRef<HTMLSpanElement>(null)
    const [loggedUser, setloggedUser] = useState<any>({})
    const [text, setText] = useState("")
    const loggedUserId = JSON.parse(localStorage.getItem("userId")!).loggedUser?._id;
  

    useEffect(() => {
       if(text !== ''){
        const searchUser = async () => {
         await getProfile(text, setUser, setPost);
       };
       mainUser && searchUser();
       mainUser && searchRef.current?.click()
       }
       if(text == ""){
        getloggedUser(setMainUser);
        getloggedUser(setloggedUser);
        getuserpost(loggedUserId, setPost)
       }
    }, [text])


console.log("thththth", mainUser)
  return (
<>
    <div
      style={{ scrollbarWidth: "thin" }}
      className={`w-screen ${Object.keys(parPost)?.length !== 0 || large ? "hidden" : "block"} h-screen bg-black overflow-y-scroll lg:w-full`}
    >
      <div className="w-full h-16 flex justify-between items-center">
        <div className=" items-center w-full text-gray-300 flex gap-5 h-10">
          <h2 className="w-24 items-center text-sm font-tahoma text-center lg:xl">
            <b onClick={() => setshowSideBar(true)}
              className={` ${searchUsers ? "hidden" : "block"} lg:block`}
            >
              <MdMenu className="text-2xl ml-5 "/>
            </b>{" "}
            <b
              className={`${searchUsers ? "block" : "hidden"} cursor-pointer`}
              onClick={() => {
                setSearchUsers(false);
                setText("");
              }}
            >
              <MdArrowBack size={30} className="ml-5" />
            </b>
          </h2>
          <div className="bg-black/90 h-full w-full rounded-xl flex lg:w-8/12">
            <input
              type="text"
              placeholder="🧐searchuser..."
              onFocus={() => setSearchUsers(true)}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="bg-transparent outline-none h-full w-full p-2 text-gray-200"
            />
            <span
              ref={searchRef}
              className={`w-8 h-full grid place-items-center ${
                searchUsers ? "hidden" : "block"
              } inline-block rounded-full text-end
             pl-3 text-2xl pr-10`}
            >
              <MdSearch />
            </span>
          </div>
        </div>
        <div
          style={{ width: "30%" }}
          className="flex invisible gap-3 pr-3 items-center justify-end lg:visible"
        >
          <img
            src={loggedUser?.profilepic}
            alt=""
            className="w-12 h-12 rounded-full border-2 border-blue-900"
          />
          <div className="flex text-gray-300 flex-col">
            <b>{loggedUser?.name}</b>
            <i className="text-sm">{loggedUser?.username}</i>
          </div>
        </div>
      </div>

      {/*    =========================================================== */}

      {
        <div className={`w-full ${searchUsers ? "hidden" : "block"}`}>
          <div className="w-full h-auto">
            <div className="w-full h-40 relative lg:h-64">
              {mainUser?.profilecover ? (
                <img
                  src={mainUser?.profilecover}
                  alt=""
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-800">
<img
            src="https://i.imgur.com/uiR4C4l.jpeg"
            alt="chat-x default cover pic"
            className="w-full h-full"
          />
</div>
              )}
              {/* ========================================= */}
              {mainUser?.profilepic ? (
                <div>
                  <img
                    src={mainUser?.profilepic}
                    alt=""
                    style={{ bottom: "-3rem" }}
                    className="w-32 ml-2 z-30 absolute border-2 border-white/90  h-32 rounded-full"
                 onClick={() => setLarge(true)} />
                </div>
              ) : (
                <span
                  style={{ bottom: "-3rem" }}
                  className="w-28 h-28 ml-5 absolute rounded-full p-1 text-2xl items-center justify-center border-2 border-white/90 flex bg-black text-white"
                >
                  <MdPerson size={90} />
                </span>
              )}
              <Link to={"/profile/id/editproile"}>
                <div
                  className={`absolute flex ${
                    loggedUserId === mainUser?._id ? "block" : "hidden"
                  } items-center justify-center mr-8 cursor-pointer border-[.9px] border-white/80
               w-24 h-8 rounded-xl text-white bottom-5 right-0 bg-blue-600 hover:bg-blue-900`}
                >
                  editProfile
                </div>
              </Link>
              <div
                onClick={async () => {
                  (await loggedUserId) !== mainUser?._id
                    ? follow_unfollow_user(mainUser?._id)
                    : "";
                }}
                className={`absolute flex ${
                  loggedUserId !== mainUser?._id ? "block" : "hidden"
                } items-center justify-center mr-8 cursor-pointer
               w-24 h-6 rounded-xl text-white bottom-5 right-0 border-[.9px] border-white/80 bg-blue-600 hover:bg-blue-900 lg:hidden lg:h-8`}
              >
                follow
              </div>
            </div>
          </div>

          <div className="w-full h-full flex bg-black text-gray-300">
            <div className="bg-black w-full h-full">
              <div className="w-full h-auto flex justify-end pr-3 items-center">
                <div className="flex flex-col gap-2 items-center text-xl text-blue">
                  <b className="text-right">
                    {!text && loggedUser?.name}
                    {text && mainUser?.name}
                  </b>
                  <i className="text-sm text-right">
                    {!text && loggedUser?.username} {text && mainUser?.username}
                  </i>
                  <span className="text-sm w-full text-center  text-blue-600">
                    joined {mainUser && `${createdAt(mainUser?.createdAt)}`}
                  </span>
                </div>
              </div>
              <div className="w-full justify-end items-center flex gap-3 p-3">
                <span>{mainUser?.following?.length} following</span>
                <span>{mainUser?.followers?.length} {mainUser?.followers?.length === 1 ?  "follower" : "followers"}</span>
              </div>
              <ul
                className="flex mt-10 wrap w-full h-full flex-col pb-96 gap-3 overflow-y-scroll"
                style={{
                  scrollbarWidth: "thin",
                  msScrollbarTrackColor: "red",
                }}
              >
                <div className={`${post.length ? "block" : "hidden"}`}>
                  {post.map((e: any, index) => {
                    return (
                      
                <PostComponent
                  e={e}
                  index={index}
                  setPost={setPost}
                  setParPost={setParPost} 
                 
                  user={user}
                  post={post}
                />
                    );
                  })}
                </div>
                <div className={`w-full h-full ${post.length ? "hidden" : "block"} grid place-items-center text-lg text-blue-300 bg-transparennt`}>
                  ... user has no posts yet
                </div>
              </ul>
            </div>
          </div>
        </div>
      }
      {
        <div
          className={`w-full h-auto flex flex-col gap-3 bg-black ${
            searchUsers ? "block" : "hidden"
          }`}
        >
          {user &&
            user?.map((e: any, index: number) => {
              return (
                <div
                  className="flex w-full min-h-10 cursor-pointer gap-3 items-center p-3 border-b-2 border-gray-800 hover:bg-gray-950"
                  onClick={async () => {
                    setMainUser(user[index?.toString()]);
                    setSearchUsers(false);
                    setText(user[index?.toString()]?.name);
                  }}
                >
                  {e.profilepic ? (
                    <img
                      src={e.profilepic}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div
                      className={`w-12 h-12 grid place-items-center rounded-full 
                ${
                  index < 2
                    ? "bg-blue-500"
                    : index < 3
                    ? "bg-accent"
                    : index < 4
                    ? "bg-gray-500"
                    : index < 6
                    ? "bg-pink-700"
                    : "bg-purple-700"
                }`}
                    >
                      <MdPerson className="text-4xl" />
                    </div>
                  )}
                  <div className="flex text-gray-300 flex-col">
                    <b>{e?.name}</b>
                    <i className="text-sm text-blue-400">{e?.username}</i>
                    <i className="text-sm">{e?.email}</i>
                  </div>
                </div>
              );
            })}
        </div>
      }
    </div>
    <div className={`w-screen ${Object.keys(parPost).length === 0 || large ? "hidden" : "block"} h-screen`}>
<ParPost setParPost={setParPost} parPost={parPost} id={parPost?._id} from={"profile"}/>
</div>

<div className={`transition-all bg-gray-900 z-30 duration-1000 relative ${large ? "block h-screen w-screen" : "hidden h-0 w-0"}`}>
<span className="flex h-12 w-12 absolute top-5 right-5 rounded-full bg-black items-center justify-center text-white" onClick={() => setLarge(false)}><MdCancel size={20}/></span>
{mainUser?.profilepic &&  (
                    <img
                      src={mainUser?.profilepic}
                      alt=""
                      className="w-full h-full z-40 object-contain"
                    />)}
 </div>
 </> );
}

export default Profile
