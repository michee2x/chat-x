import { useState } from "react";
import {Link} from "react-router-dom"
import { FaBookmark, FaHeart, FaComment, FaPlay } from "react-icons/fa";
import {BsPerson } from "react-icons/bs";
import {
  likeUnlike,
  bookMark
} from "../hooks/likepost";
import { MdDelete } from "react-icons/md";
import { deletePost } from "../hooks/useDeletePostHook";
import { createdAt } from "../hooks/useCreatedHook";

const PostComponent = ({
  index,
  e,
  setPost,
  setLoading,
  post,
  setParPost,
  user,
  status
}: any) => {
  const [like, setLike] = useState(false);
  const [bookmarking, setBookMarking] = useState(false);

  const storeIndex = (index: number) => {
    if (status === "foryou") {
      localStorage.setItem("clickedLi", index?.toString());
    }
    if (status === "following") {
      localStorage.setItem("clickedLi2", index?.toString());
    }
  };
console.log(like)
  return (
    <>
      <li
        key={index}
        className={`mx-auto relative ${
e?.user?.username === post[index+1]?.user?.username ? "border-b-0" : "border-b-[.9px]"
} border-gray-600 mb-1 w-full flex gap-2 bg-black lg:gap-6`}
      >
        <Link to={`/profile`} className="pl-1 w-auto h-full pt-1">
<div className={`border-[1px] transition-all duration-1000 ${
e?.user?.username === post[index+1]?.user?.username ? "block h-full" : "hidden h-0"
} absolute left-[8%] border-gray-700`}></div>
          {e.user?.profilepic === "" ? (
            <span
              className="flex justify-center items-center
               rounded-full w-12 h-12 z-10 bg-blue-900"
            >
              <BsPerson className="text-4xl z-10 text-white" />{" "}
            </span>
          ) : (
<span className="rounded-full w-12 h-12 flex">
            <img
              src={e.user?.profilepic}
              alt="img"
              className="block rounded-full z-10 h-full w-full"
            />
</span>
          )}
        </Link>
        <div className="w-full h-auto">
          <main onClick={() => {setParPost(post[index])}} className="w-full pr-3 h-auto flex">
            <div
              className="w-full"
              onClick={() => storeIndex(index)}
            >
              <div className="flex flex-col items-center rounded-md">
                <div className="w-full h-auto flex flex-col gap-2 text-gray-300 min-h-24">
                  <div>
                    <span><b className="text-lg text-white">{e.user?.name}</b> <i className="text-gray-400 pl-1 text-[12px]">@{e.user?.username}</i></span>
                    <span className="text-xs whitespace-no-wrap pl-5 text-blue-400">
                      {`${createdAt(e?.createdAt)}` !== "undefined" ? `${createdAt(e?.createdAt)}` : "just now"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="text-[13px]">{e.text.length > 100 ? `${e.text.slice(0, 100)}...` : e.text}</div>
                    <div className="w-full max-h-64 rounded-tl-2xl rounded-tr-xl h-auto lg:w-[70%]">
                      {e.file?.split("/")[4] === "video" ? (
                        <div className="w-64 max-h-64 relative">
                          <div className="w-full h-full grid place-items-center absolute">
                            <span className="w-12 h-12 bg-blue-500 grid place-items-center rounded-full z-10">
                              <FaPlay className="text-[1rem]" />
                            </span>
                          </div>
                          <video
                            src={e.file}
                            className={`w-full max-h-64 rounded-xl`}
                            typeof="video/mp4"
                          />
                        </div>
                      ) : (
                        <img
                          src={e.file}
                          alt=""
                          className={`w-full max-h-64 object-cover rounded-xl h-auto`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <div
            className={`w-full bg-opacity-60 min-h-10
           flex justify-between items-center lg:w-[70%]`}>
            <div className="w-12 h-full rounded-full gap-2 flex text-xm font-bold items-center justify-center text-white">
              <span
                onClick={async () => 
                 await likeUnlike(
                    `${e._id}`,
                    setPost,
                    setLike,
                    post,
                    index
                  )
                }
              >
                <FaHeart
                  className={`text-sm ${(like && e?.likes?.includes(user._id) === false) ? "text-pink-700" : (like && e?.likes?.includes(user._id) === true) ? "text-white" : e?.likes?.includes(user._id) ? "text-pink-700" : "text-white"
                  } cursor-pointer`}
                />
              </span>
              <span className="text-xs">{(like && e?.likes?.includes(user._id) === false) ? e.likes.length + 1 : (like && e?.likes?.includes(user._id) === true) ?  e.likes.length - 1 : e.likes.length}</span>
            </div>
            <div
              className={`w-12 h-full rounded-full cursor-pointer gap-2 flex items-center justify-center text-xm font-bold text-white`}
            >
              <span onClick={() => bookMark(e._id, setPost, setBookMarking, index, post)}>
                <FaBookmark
                  className={`text-sm ${bookmarking ? "hidden" : "block"} ${
                    e?.bookmark?.includes(user?._id)
                      ? "text-blue-700"
                      : "text-white"
                  } cursor-pointer`}
                />
                <span
                  className={`loading ${
                    bookmarking ? "block" : "hidden"
                  } loading-spinner loading-sm`}
                ></span>
              </span>
              <span className="text-xs">{e?.bookmark.length}</span>
            </div>
<div
              className={`w-12 h-full rounded-full cursor-pointer gap-2 flex items-center text-white justify-center text-xm font-bold`}
            >
              <span>
                <FaComment
                  className={`text-sm`}
                />
               
              </span>
              <span className="text-xs">{e?.Comments.length}</span>
            </div>
            <div
              className={`w-12 h-full rounded-full cursor-pointer gap-2 ${
                e?.user?._id === user._id ? "block" : "hidden"
              } flex items-center justify-center text-white`}
            >
              <span onClick={() => deletePost(e._id, setPost, setLoading)}>
                <MdDelete className="text-sm text-red-500" />
              </span>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default PostComponent;
