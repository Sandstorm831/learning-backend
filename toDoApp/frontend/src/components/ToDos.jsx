import { IoMdDoneAll } from "react-icons/io";
import { BiTaskX } from "react-icons/bi";
import "../output.css";
/**
 * Todos : [
 * {
 *   title: String,
 *   description: String,
 *   completed: Boolean,
 * }
 * ]
 *
 *
 */

export function Todos({ todos, clicker, setClicker }) {
  return (
    <div className="flex flex-col">
      {todos.map((item, idx) => {
        return (
          <div className="flex flex-row rounded-md bg-[#142130] m-2 px-2 overflow-scroll">
            <div className="w-11 p-1 mx-1 my-2 flex flex-col justify-center">
              <button
                className=" bg-[#fff7ec] h-[25px] w-[25px] "
                onClick={() => {
                  try {
                    fetch("http://localhost:3000/completed", {
                      method: "PUT",
                      body: JSON.stringify({
                        id: item._id,
                      }),
                      headers: {
                        "Content-type": "Application/json",
                      },
                    })
                      .then((res) => {
                        if (!res.ok)
                          throw new Error(`response status : ${res.status}`);
                        else setClicker(clicker + 1);
                      })
                      .catch((e) => {
                        console.log(e.message);
                      });
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                {item.completed ? (
                  <IoMdDoneAll className="text-[#fff7ec] bg-[#142130] text-2xl" />
                ) : (
                  " "
                )}
              </button>
            </div>
            <div className="w-full">
              <h1 className="uppercase text-pretty text-xl italic font-medium font-mono text-[#fff7ec]">
                {item.title}
              </h1>

              <h2 className="font-serif h-[48px] pe-12 text-justify text-[#ccc5bc] overflow-scroll">
                {item.description}
              </h2>
            </div>
            <div className="w-11 flex flex-col justify-center relative">
              <button
                className="flex flex-col justify-center"
                onClick={async () => {
                  try {
                    const response = await fetch(
                      "http://localhost:3000/delete",
                      {
                        method: "DELETE",
                        body: JSON.stringify({
                          id: item._id,
                        }),
                        headers: {
                          "Content-type": "Application/json",
                        },
                      }
                    );
                    if (!response.ok)
                      throw new Error(`response Status: ${response.status}`);
                    else {
                      setClicker(clicker + 1);
                    }
                  } catch (err) {
                    console.log(err.message);
                  }
                }}
              >
                <BiTaskX className="text-[#fff7ec] bg-[#142130] text-2xl absolute hover:text-red-600 active:translate-x-[1px] active:translate-y-1 transition duration-200 ease-out" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
