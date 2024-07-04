import { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { commentpost} from "../hooks/likepost";

const CommentPost = ({commentClicked, setComment setCommentClicked, postId, setPost} : any) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState("");
  const [serverFile, setServerFile] = useState<any>(null)
  const [text, setText] = useState("");

  const handleFileChange = (e: any) => {
    const Inputfile = e.target.files[0];
    if (Inputfile) {
      const objUrl = URL.createObjectURL(Inputfile);
      setFile(objUrl);
      console.log(objUrl);
    
    }

    if(Inputfile){
      const reader = new FileReader()
      reader.onload  = () => {
        setServerFile(reader.result)
      }
      reader.readAsDataURL(Inputfile)
    }
  };

  const settingText = (e: any) => {
    setText(e.target.value);
  };
 
  return (
    <div className="w-full relative h-screen bg-black">
      <div
        className="absolute px-10 p-1 text-sm rounded-2xl cursor-pointer top-7 right-3
       bg-blue-800 text-white hover:bg-blue-950"
        onClick={() => setCommentClicked(!commentClicked)}
      >
        cancel
      </div>
      <div className="w-full text-gray-600 h-20 flex items-center justify-center">
        Comment post...
      </div>
      <div
        style={{ width: "80%" }}
        className="mx-auto rounded-2xl min-h-10 border-2 border-solid border-gray-600"
      >
        <input
          type="text"
          spellCheck="false"
          value={text}
          onChange={settingText}
          className="w-full text-gray-400 text-xl px-3 outline-none rounded-2xl bg-transparent h-full min-h-10"
        />
      </div>

      <div
        style={{ width: "70%" }}
        className="mx-auto relative mt-8 rounded-2xl flex items-center justify-center flex-col
       gap-6 h-44 border-2 border-solid cursor-pointer border-gray-600 hover:bg-gray-900"
        onClick={() => inputFileRef.current?.click()}
      >
        {!file && (
          <div>
            <FaUpload className="text-2xl text-gray-400" />
          </div>
        )}
        {!file && <div>Upload an image</div>}
        <input
          type="file"
          accept="image/*,video/*"
          ref={inputFileRef}
          className="hidden"
          onChange={handleFileChange}
        />
        {file ? (
          <img
            src={`${file}`}
            alt=""
            className="w-full rounded-2xl h-full absolute"
          />
        ) : (
          <div></div>
        )}
      </div>
      {file && (
        <div
          className="ml-28 w-20 text-gray-400 rounded-2xl cursor-pointer bg-gray-600 h-8 grid place-items-center mt-3
       hover:bg-gray-800"
          onClick={() => setFile("")}
        >
          cancel
        </div>
      )}

      <div
        className="text-center mt-8 text-blue-600 px-6 rounded-xl cursor-pointer mx-auto
       border border-blue-950 w-28 nounderlineb hover:bg-blue-900"
        onClick={() => {
          commentpost(text, serverFile, postId, setPost, setComment);
          setCommentClicked(!commentClicked);
        }}
      >
        comment
      </div>
    </div>
  );
};

export default CommentPost;
/* onClick={async () => {handleComment;setCommentClicked(!commentClicked)}} */