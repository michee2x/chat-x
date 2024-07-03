import { useState } from "react";
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
  fetchPosts,
  setLoading,
  post,
  setParPost,
  userId,
  from,
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

  return (
    <>
      <li
        key={index}
        onClick={() => {setParPost(post[index])}}
        className="mx-auto border-b-[.9px] border-gray-600 mb-1 w-full flex gap-2 bg-black lg:gap-6"
      >
        <div className="pl-1 pt-1">
          {e.user?.profilepic === "" ? (
            <span
              className="flex justify-center items-center
               rounded-full w-12 h-12 bg-blue-900"
            >
              <BsPerson className="text-4xl text-white" />{" "}
            </span>
          ) : (
            <img
              src={e.user?.profilepic}
              alt="img"
              className="block rounded-full h-12 w-12"
            />
          )}
        </div>
        <div className="w-full h-auto">
          <main className="w-full h-auto flex">
            <div
              className="w-full"
              onClick={() => storeIndex(index)}
            >
              <div className="flex flex-col items-center rounded-md">
                <div className="w-full h-auto flex flex-col gap-2 text-gray-300 min-h-24">
                  <div>
                    <span><b className="text-lg text-white">{e.user?.name}</b> <i className="text-gray-400 pl-1 text-[12px]">@{e.user?.username}</i></span>
                    <span className="text-xs pl-5 text-blue-400">
                      {`${createdAt(e?.createdAt)}` !== "undefined" ? `${createdAt(e?.createdAt)}` : "just now"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="text-[13px]">{e.text.length > 100 ? `${e.text.slice(0, 100)}...` : e.text}</div>
                    <div className="w-full max-h-64 rounded-tl-2xl rounded-tr-xl h-auto lg:w-[70%]">
                      {e.file?.split("/")[4] === "video" ? (
                        <div className="w-full max-h-64 relative">
                          <div className="w-full h-full grid place-items-center absolute">
                            <span className="w-14 h-14 bg-blue-700 flex items-center justify-center rounded-full z-10">
                              <FaPlay className="text-[1.5rem]" />
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
                          className={`w-full max-h-64 rounded-xl h-auto`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <div
            className={`w-full ${
              from === "bookmark" ? "hidden" : "block"
            } bg-opacity-60 min-h-10
           flex justify-between items-center lg:w-[70%]`}
          >
            <div className="w-12 h-full rounded-full gap-2 flex text-xm font-bold items-center justify-center text-white">
              <span
                onClick={async () => {
                  await likeUnlike(
                    `${e._id}`,
                    setPost,
                    e.user._id,
                    fetchPosts,
                    setLike
                  );
                }}
              >
                <FaHeart
                  className={`text-sm ${like ? "hidden" : "block"} ${
                    e?.likes?.includes(userId) ? "text-pink-700" : "text-white"
                  } cursor-pointer`}
                />
                <span
                  className={`loading ${
                    like ? "block" : "hidden"
                  } loading-spinner loading-sm`}
                ></span>
              </span>
              <span className="text-xs">{e.likes.length}</span>
            </div>
            <div
              className={`w-12 h-full rounded-full cursor-pointer gap-2 flex items-center justify-center text-xm font-bold text-white`}
            >
              <span onClick={() => bookMark(e._id, setPost, setBookMarking)}>
                <FaBookmark
                  className={`text-sm ${bookmarking ? "hidden" : "block"} ${
                    e?.bookmark?.includes(userId)
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
              className={`w-12 h-full rounded-full cursor-pointer gap-2 flex items-center justify-center text-xm font-bold text-white`}
            >
              <span>
                <FaComment
                  className={`text-sm  cursor-pointer`}
                />
               
              </span>
              <span className="text-xs">{e?.Comments.length}</span>
            </div>
            <div
              className={`w-12 h-full rounded-full cursor-pointer gap-2 ${
                e?.user?._id === userId ? "block" : "hidden"
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
