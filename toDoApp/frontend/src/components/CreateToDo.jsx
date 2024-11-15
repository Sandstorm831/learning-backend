import { Buffer } from "buffer";
import "../output.css";
import { useState } from "react";

export function CreateToDo({ clicker, setClicker }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="flex flex-col h-full bg-[#1bb3ab] justify-center">
      <div className="flex flex-row justify-center text-wrap">
        <div className="flex flex-col justify-center">
          <h1 className="text-[#fff7ec] text-wrap font-mono text-9xl">
            Create
          </h1>
          <h1 className="text-[#fff7ec] text-wrap font-mono text-9xl">
            To-Do .
          </h1>
        </div>
      </div>
      <div className="flex flex-row justify-center bg-[#1bb3ab]">
        {/* My Stylized Input component */}
        <div className=" relative h-14 w-96 m-4 ">
          <input
            className="peer text-[#fff7ec] static outline-none bg-[#1bb3ab] w-full h-full border border-[#fff7ec] rounded-md p-4 focus:border-[#fff7ec] transition duration-200 ease-out"
            type="text"
            placeholder=" "
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
          <label className="absolute bg-[#1bb3ab] text-[#fff7ec] left-4 bottom-4 peer-focus:-translate-x-[5px] peer-focus:-translate-y-[31px] peer-focus:scale-95 peer peer-focus:text-[#fff7ec] transition duration-200 ease-out peer-[:not(:placeholder-shown)]:-translate-x-[5px] peer-[:not(:placeholder-shown)]:-translate-y-[31px] peer-[:not(:placeholder-shown)]:scale-95">
            title
          </label>
        </div>
        {/* Upto Here */}
      </div>
      <div className="flex flex-row justify-center bg-[#1bb3ab]">
        <div className="relative h-64 w-96 m-4">
          <textarea
            className="text-[#fff7ec] resize-none bg-[#1bb3ab] peer static outline-none w-full h-full p-4 border border-[#fff7ec] rounded-md focus:border-[#fff7ec] transition duration-200 ease-out"
            type="text"
            placeholder=" "
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
          />
          <label className="absolute bg-[#1bb3ab] text-[#fff7ec] left-4 top-4 peer-focus:-translate-x-[5px] peer-focus:-translate-y-[31px] peer-focus:scale-95 peer peer-focus:text-[#fff7ec] transition duration-200 ease-out peer-[:not(:placeholder-shown)]:-translate-x-[5px] peer-[:not(:placeholder-shown)]:-translate-y-[31px] peer-[:not(:placeholder-shown)]:scale-95">
            Description
          </label>
        </div>
      </div>
      <div className="flex flex-row justify-center bg-[#1bb3ab]">
        <button
          className="m-4 p-1 shadow-[0_1px_2px_0_rgba(255,247,236,0.05)] text-[#fff7ec] border-r-8 border-t border-b-4 border-l-2 border-r-[#ccc5bc] border-b-[#fff7ec] border-t-[#fff8ef] border-s-[#fff7ed] w-5/6 hover:shadow-[5px_8px_3px_-1px_rgba(229,222,212,1)] hover:text-[#fff7ec] hover:-translate-y-1 hover:-translate-x-[1px] transition duration-300 ease-out active:translate-x-[1px] active:translate-y-1 activa:text-[#fff400] active:shadow-none"
          onClick={async () => {
            const payload = JSON.stringify({
              title: title,
              description: description,
            });
            try {
              fetch("http://localhost:3000/todo", {
                method: "POST",
                body: payload,
                headers: {
                  "Content-type": "application/json",
                  "Content-Length": Buffer.byteLength(payload, "utf-8"),
                },
              })
                .then((res) => {
                  if (!res.ok) {
                    throw new Error(`response status : ${res.status}`);
                  } else {
                    setClicker(clicker + 1);
                    setTitle("");
                    setDescription("");
                  }
                })
                .catch((err) => {
                  console.log(err.message);
                });
            } catch (err) {
              console.log(err.res);
            }
          }}
        >
          Create ToDo
        </button>
      </div>
    </div>
  );
}

// border-s-cyan-800 border-r-teal-800 border-t-sky-800 border-b-teal-800
// [0_4px_6px_-1px_rgba(255,247,236,0.3)]
