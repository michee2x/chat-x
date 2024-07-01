import { useEffect,useRef, useState } from "react";
import { } from "react-icons/io";
import {BsPerson} from "react-icons/bs";
import {MdPerson, MdArrowLeft, MdArrowRight} from "react-icons/md";
import { fetchData } from "../fetchData";
import {Navigate} from "react-router-dom";
import {
  getloggedUser,
  getFollowingPost
} from "../hooks/likepost";
import PostComponent from "./postComponent";

const Home = () => {
  const history = useHistory()
  const [post, setPost] = useState<any>([]);
  const [followingPost, setFollowingPost] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>([]);
  const scrollRef = useRef<HTMLUListElement>(null);
  const scrollRef2 = useRef<HTMLUListElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(1)
  const divRef = useRef<HTMLDivElement>(null)
const [status, setStatus] = useState(localStorage.getItem("status")! || "foryou")

const loggedINUser = localStorage.getItem("userId")!;
if (loggedINUser === null) {
  return <Navigate to={'/login'}
}
useEffect(() => {
  if(status !== "following"){
    fetchData(setPost, setLoading, page);
  }
  if(status === "following"){
    getFollowingPost(setFollowingPost, setLoading);
  }
  getloggedUser(setUser);
  if (divRef.current ) {
    const f = divRef.current.firstChild as HTMLElement
    f.scrollIntoView()
  }

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
        <div className="h-screen w-screen relative bg-black lg:w-full">
          <div className="w-full z-40 absolute mb-10 text-blue-700 h-16 flex justify-between items-center bg-black border-b-2 border-gray-500 lg:border-0">
            <span
              className={`w-1/2 flex flex-col items-center ${
                status === "foryou" ? "border-b-2 border-blue-500" : ""
              } justify-center 
              h-full lg:w-1/2`}
              onClick={async () => {
                setStatus("foryou");
                setToStorge("foryou");
                await fetchData(setPost, setLoading);
              }}
            >
              <img
                src={user?.profilepic}
                alt="img"
                className="w-6 h-6 rounded-full lg:hidden"
              />
              <BsPerson className="hidden lg:block text-white text-xl" />
              <b>interest</b>
            </span>
            <span
              className={`w-1/2 flex flex-col items-center ${
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
              className="flex mt-6 wrap pb-3 w-full h-auto flex-col gap-3 overflow-y-scroll"
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
                        setLoading={setLoading}
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
                        setLoading={setLoading}
                        userId={user?._id}
                        from={"home"}
                        status={status}
                      />
                    );
                  })}
              </ul>
              <div
                ref={loadingRef}
                className={`w-full text-blue-700 flex items-center justify-evenly mb-2 h-10`}
              >
                <div
                  className={`w-1/2 cursor-pointer ${page === 1 ? "text-gray-600" : "text-blue-700"} h-full flex items-center justify-center`}
                  onClick={() => {
                    page === 1 ? "" : setPage(page - 1);
                  }}
                >
                  <span>back</span>
                  <MdArrowLeft className="text-5xl" />
                </div>
                <div
                  className="w-1/2 cursor-pointer h-full flex items-center justify-center"
                  onClick={() => {
                    setPage(page + 1);
                  }}
                >
                  <MdArrowRight className="text-5xl" />
                  <span>next</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
