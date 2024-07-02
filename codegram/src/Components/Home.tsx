import { useEffect,useRef, useState } from "react";
import { fetchData } from "../fetchData";
import { MdPerson } from 'react-icons/md';
import {Navigate} from "react-router-dom";
import {
  getloggedUser,
  getFollowingPost
} from "../hooks/likepost";
import PostComponent from "./postComponent";
import ParPost from "./Post";

const Home = () => {
  
  
  const [parPostId, setParPostId] = useState("")
  const [post, setPost] = useState<any>([]);
  const [followingPost, setFollowingPost] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>([]);
  const scrollRef = useRef<HTMLUListElement>(null);
  const scrollRef2 = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(1)
  const divRef = useRef<HTMLDivElement>(null)
const loadingRef = useRef<HTMLDivElement>(null)
const [status, setStatus] = useState(localStorage.getItem("status")! || "foryou")
const [loggedInUser] = useState(localStorage.getItem("userId")! || "")

useEffect(() => {

document.addEventListener("scroll", () => {
if(loadingRef.current){
const refTop = loadingRef.current.getBoundingClientRect().top

if(refTop > 0){
setPage(prev => prev + 1)
}
}
})
}, [])
useEffect(() => {
  if(status !== "following"){
    fetchData(setPost, setLoading, page);
  }
  if(status === "following"){
    getFollowingPost(setFollowingPost, setLoading);
  }
  getloggedUser(setUser);

}, [page])

useEffect(() => {
  const statusState = localStorage.getItem("status")!
  setStatus(statusState)
},[])

useEffect(() => {
  const scrolltoBottom = () => {
    const li = parseInt(localStorage.getItem("clickedLi")!);
    const li2 = parseInt(localStorage.getItem("clickedLi2")!);
    console.log("this is the li in home route", li);
    if (scrollRef.current && status === "foryou") {
      const lastItem = scrollRef.current.children[li] as HTMLElement;

      lastItem?.scrollIntoView();
      console.log("this is scrroo");
    }
    if (scrollRef2.current && status === "following") {
      const lastItem = scrollRef2.current.children[li2] as HTMLElement;

      lastItem?.scrollIntoView();
      console.log("this is scrroo");
    }
  };
  scrolltoBottom()
}, [])

console.log("hi there this is login user", loggedInUser)

if (!loggedInUser) {
  return <Navigate to={'/'} />
}

const Skeletons = () => {
  return (
    <span className="loading loading-spinner loading-lg"></span>
  );
}

const setToStorge = (x:string) => {
  localStorage.setItem("status", x)
}

  return (
    <>
      {loading ? (
        <div className="h-screen w-screen gap-2 flex items-center flex-col justify-center text-gray-300 bg-black lg:w-full lg:pt-24">
          <Skeletons />
          <div className="text-blue-800 font-extrabold text-xl font-mono">chat-x</div>
        </div>
      ) : (
        <div className={`h-screen ${parPostId ? "hidden" : "block"} w-screen relative bg-black lg:w-full`}>
          <div className="w-full z-40 absolute mb-10 text-blue-700 h-16 flex justify-between items-center bg-black border-b-2 border-gray-500 lg:border-0">
            <span
              className={`w-1/3 flex flex-col items-center ${
                status === "foryou" ? "border-b-2 border-blue-500" : ""
              } justify-center 
              h-full lg:w-1/3`}
              onClick={async () => {
                setStatus("foryou");
                setToStorge("foryou");
                await fetchData(setPost, setLoading);
              }}
            >
              <img
                src={user?.profilepic}
                alt="img"
                className={`w-6 ${user?.profilepic ? "block" : "hidden"}  h-6 rounded-full lg:hidden`}
              />
              <span className={`p-1 bg-white-600 ${!user?.profilepic ? "block" : "hidden"} rounded-full`}>
                <MdPerson color="blue" className="text-xl" />
              </span>
              <b>interest</b>
            </span>
       <span className="w-1/3 h-full flex items-center justify-center text-white  tracking-widest text-white/80 text-[1.5rem]">CX</span>
            <span
              className={`w-1/3 flex flex-col items-center ${
                status === "following" ? "border-b-2 border-blue-500" : ""
              } justify-center 
              h-full lg:w-1/2`}
              onClick={async () => {
                setStatus("following");
                setToStorge("following");
                await getFollowingPost(setFollowingPost, setLoading);
              }}
            >
              <span className="p-1 bg-blue-600 rounded-full">
                <MdPerson color="white" className="text-xl" />
              </span>
              <b>following</b>
            </span>
          </div>

          <div ref={divRef} className="w-full h-full overflow-y-scroll">
            
            <div className="w-full h-16 invisible"></div>
            <div
              className="flex mt-6 wrap pb-3 w-full h-auto flex-col gap-1 overflow-y-scroll"
              style={{ scrollbarWidth: "thin", msScrollbarTrackColor: "red" }}
            >
              <ul ref={scrollRef} className="w-full h-full">
                {status === "foryou" &&
                  post?.map((e: any, index:number) => {
                    return (
                      <PostComponent
                        e={e}
                        index={index}
                        setPost={setPost}
                        fetchPosts={true}
setParPostId={setParPostId}                      setLoading={setLoading}
                        userId={user?._id}
                        from={"home"}
                        status={status}
                      />
                    );
                  })}
              </ul>
              <ul ref={scrollRef2} className="w-full h-full mt-6">
                {status === "following" &&
                  followingPost.map((e: any, index:number) => {
                    return (
                      <PostComponent
                        e={e}
                        index={index}
                        setPost={setPost}
                        fetchPosts={true}
setParPostId={setParPostId}                        setLoading={setLoading}
                        userId={user?._id}
                        from={"home"}
                        status={status}
                      />
                    );
                  })}
              </ul>
              <div
                ref={loadingRef}
                className={`w-full text-blue-700 flex flex-col gap-2 items-center justify-center h-16`}
              >
               <div className="loading loading-spinner loading-md"></div>
 <span>loading more post</span>
                 </div>
            </div>
          </div>
        </div>
      )}
    <div className={`w-screen ${parPostId ? "block" : "hidden"} h-screen`}>
<ParPost parPostId={parPostId} setParPostId={setParPostId} id={parPostId} from={"home"}/>
</div>
    </>
  );
};

export default Home;
