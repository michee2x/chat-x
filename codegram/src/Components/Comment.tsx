import { useRef, useState } from 'react'
import {FaUpload} from "react-icons/fa"
import {Navigate } from 'react-router-dom'
import { createpost } from '../hooks/likepost'
import { MdCancel } from 'react-icons/md';


const Comment = () => {
const inputFileRef = useRef<HTMLInputElement>(null)
const [file, setFile] = useState("")
const [text, setText] = useState("")
const [navigate, setNavigate] = useState(false)
const [inputFile, setInputFile] = useState<any>(null)


const handleFileChange = (e:any) => {
    const Inputfile = e.target.files[0]
    
    setInputFile(Inputfile)
    if(Inputfile){
    const objUrl = URL.createObjectURL(Inputfile);
      setFile(objUrl);
      console.log(Inputfile.type);
      console.log(objUrl);
    }
}

const settingText = (e:any) => {
setText(e.target.value)
}
const handlePost = async () => {
  if(file || text){
    const formData = new FormData()
    formData.append("file", inputFile)
    formData.append("text", text)
    await createpost(formData, setNavigate);
  } 
}

const inputSize = {
  height: `${!text.split("\n").length ? "20" : text.split("\n").length * 20 }px`,
};

if (navigate) {
  return <Navigate to={"/"} />;
}

  return (
    <div className="w-screen relative h-screen bg-black overflow-y-scroll lg:w-full">
      <div className="w-full relative text-gray-600 h-20 flex items-center justify-center">
        Create a post...
        {(file || text) && (
          <div className="absolute cursor-pointer right-6" onClick={() => {setFile("");setText("")}}>
            <MdCancel className='text-2xl text-blue-300 hover:text-blue-500'/>
          </div>
        )}
      </div>

      <div
        style={{ width: "80%" }}
        className="mx-auto rounded-2xl border-2 border-solid border-gray-600"
      >
        <textarea
          spellCheck="false"
          value={text}
          onChange={settingText}
          style={inputSize}
          className="w-full text-gray-400 min-h-10 pt-2 pb-2 max-h-16 flex items-center text-xl px-3 outline-none rounded-2xl bg-transparent"
        />
      </div>

      <div
        className={`mx-auto w-[70%] relative mt-8 rounded-2xl flex items-center justify-center flex-col
       gap-6 h-64 border-2 border-solid cursor-pointer ${file && "bg-transparent border-none"} border-gray-600 hover:bg-gray-900 lg:h-96`}
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
        {inputFile?.type === "video/mp4" && file ? (
          <video
            src={`${file}`}
            className={`w-full bg-cover ${file ? "block" : "hidden"} rounded-2xl h-full`}
          />
        ) : (
          <img
            src={`${file}`}
            alt="img"
            className={`w-full ${file ? "block" : "hidden"} rounded-2xl h-full`}
          />
        )}
      </div>

      <div
        className={`text-center text-white mt-8 ${file || text ? "bg-blue-600" : "bg-gray-500"} px-6 rounded-xl cursor-pointer mx-auto
       border border-blue-950 w-28 nounderlineb hover:bg-blue-900 `}
        onClick={ handlePost}
      >
        posts
      </div>
    </div>
  );
}

export default Comment