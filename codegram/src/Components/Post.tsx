import {useState } from "react";
import { FaArrowLeft} from "react-icons/fa";
import { BsPerson} from "react-icons/bs";
import CommentPost from "./CommentPost";
import {follow_unfollow_user} from "../hooks/likepost";
import {createdAt} from "../hooks/useCreatedHook"
import { IoMdHeart } from "react-icons/io";
import { MdBookmark } from "react-icons/md";

const ParPost = ({setParPost,parPost,id, from}:any) => {

  const [comments, setComments] = useState([])
  const [commentClicked, setCommentClicked] = useState(false)

  return (
    <>
      <div
        className={`overflow-y-scroll h-screen w-screen ${
          commentClicked ? "hidden" : ""
        } bg-black lg:w-full`}
      >
        {parPost.length === 0 ? (
          <div className="w-full h-full grid place-items-center text-2xl">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : (
          <div className="h-full w-full bg-black">
            <div className="w-full text-xl flex justify-between items-center h-12 border-b-2 border-gray-500 relative">
              <div className="w-1/2 items-center flex pl-3 gap-3 h-full">
                <div
                  className="flex gap-3 items-center"
                  onClick={() => {setParPost({})}}
                >
                  <FaArrowLeft className="text-blue-600 text-xl" />{" "}
                  <span className="text-blue-600">{from}</span>
                </div>
              </div>
              <div className="w-1/2 h-full flex items-center gap-2 justify-end pr-3">
                <span
                  className="w-24 text-sm h-6 grid place-items-center rounded-xl text-center
             cursor-pointer bg-blue-500 hover:bg-blue-800 text-white"
                  onClick={async () => {
                    await follow_unfollow_user(parPost?.user?._id);
                  }}
                >
                  follow
                </span>
                <span
                  className="w-24 text-sm h-6 grid place-items-center rounded-xl text-center
             cursor-pointer bg-blue-500 hover:bg-blue-800 text-white"
                  onClick={() => setCommentClicked(!commentClicked)}
                >
                  comment
                </span>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <div className="pt-3 px-2 pb-1">
                {!parPost?.user?.profilepic ? (
                  <span
                    className="flex justify-center items-center
               rounded-full w-12 h-12 bg-blue-900"
                  >
                    <BsPerson className="text-4xl text-white" />{" "}
                  </span>
                ) : (
                  <img
                    src={parPost?.user?.profilepic}
                    alt="img"
                    className="w-14 h-14 rounded-full border-2 border-blue-900"
                  />
                )}
              </div>
              <div className="flex flex-col text-gray-500">
                <span>{parPost?.user?.name}</span>
                <span>{parPost?.user?.username}</span>
              </div>
            </div>

            <div className="w-full mt-5 h-auto lg:flex flex-row-reverse gap-5">
              <div className="text-gray-300 mx-auto h-auto p-4 lg:w-1/2">
                {parPost ? parPost?.text : ""}
              </div>

              <div className="mx-auto h-auto w-[95%] lg:w-[100%]">
                {parPost.file?.split("/")[4] === "video" ? (
                  <video
                    src={parPost?.file}
                    className="w-full h-full bg-cover rounded-2xl"
                    autoPlay
                    typeof="video/mp4"
                    controls
                  />
                ) : (
                  <img
                    src={parPost?.file}
                    alt=""
                    className="w-full bg-cover rounded-2xl h-auto"
                  />
                )}
              </div>
            </div>
            <div className="text-gray-500 flex flex-col gap-3 px-3 mt-2">
              <span>created {parPost && `${createdAt(parPost?.user?.createdAt)}`}</span>
              <span className="flex pb-2 gap-4 text-md w-full border-b-2 border-gray-700 items-center">
                <span className="flex text-gray-400 gap-1 items-center">
                  <MdBookmark />
                  {parPost && parPost.bookmark?.length}
                </span>{" "}
                Bookmarks
              </span>
              <span className="flex pb-2 gap-4 text-md w-full items-center">
                <span className="flex text-gray-400 gap-1 items-center">
                  <IoMdHeart />
                  {parPost && parPost.likes?.length}
                </span>{" "}
                likes
              </span>
            </div>
            <div className="grid relative w-full h-full pb-64 lg:grid-cols-2">
              {
                comments?.map((e: any, index) => {
                  return (
                    <ul
                      className={`mx-auto  rounded-2xl ${e.file ? "h-64" : "h-14"}  bg-black ${
                        index % 2 == 0
                          ? "border-l-4 border-t-4"
                          : "border-r-4 border-t-4"
                      } border-solid border-gray-900 rounded-xl `}
                      style={{ width: "95%" }}
                    >
                      <li key={e.text} className="flex gap-2 p-2">
                        <div className="w-10  h-10 rounded-xl">
                          {!e?.userid?.profilepic ? (
                            <span
                              className=" flex justify-center items-center
               rounded-full w-10 h-10 bg-gray-600"
                            >
                              <BsPerson className="text-4xl text-white" />{" "}
                            </span>
                          ) : (
                            <img
                              src={e?.userid?.profilepic}
                              alt="img"
                              className="w-full rounded-full h-full"
                            />
                          )}
                        </div>
                        <div className="w-full flex-col text-gray-300 flex gap-3">
                          <div className="flex flex-col gap-2">

<span className="text-xm font-bold">{e?.userid?.name}</span>{e.text}<span></span></div>
{e.file &&
                          <div>
                            <img
                              src={e.file}
                              alt=""
                              className="max-h-40 rounded-xl w-[80%]"
                            />
                          </div>}
                        </div>
                      </li>
                    </ul>
                  );
                })}
              {comments.length === 0 && (
                <div className="text-2xl absolute bg-gray-900 text-white w-full h-screen grid place-items-center">
                 leave a comment
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div
        className={`h-auto w-screen ${
          commentClicked ? "block" : "hidden"
        } bg-black lg:w-full`}
      >
        <CommentPost
          commentClicked={commentClicked}
          setComments={setComments}
          setPost={setParPost}
          setCommentClicked={setCommentClicked}
          postId={id}
        />
      </div>
    </>
  );
};

export default ParPost;
