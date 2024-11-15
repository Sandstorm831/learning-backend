import { useEffect, useState } from "react";
import { CreateToDo } from "./components/CreateToDo";
import { Todos } from "./components/ToDos";
import "./output.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [clickedOnCreateToDo, setClickedOnCreateToDo] = useState(0);

  /**
   * If you find a CORS error while hitting backedn with frontend the same machine, follow the folling steps in backend to remove the error:
   * 1. npm install cors
   * 2. const cors = require("cors");
   * 3. app.use(cors());
   */
  useEffect(() => {
    const contactBackend = () => {
      fetch("http://localhost:3000/todos")
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          setTodos(json.todos);
        });
    };
    contactBackend();
  }, [clickedOnCreateToDo]);

  return (
    <div className="h-screen">
      <div className="flex flex-row h-full">
        <div className="flex flex-col justify-center w-1/3">
          <CreateToDo
            clicker={clickedOnCreateToDo}
            setClicker={setClickedOnCreateToDo}
          />
        </div>
        <div className="flex flex-col p-4 overflow-scroll bg-[#1bb3ab] w-2/3">
          <Todos
            todos={todos}
            clicker={clickedOnCreateToDo}
            setClicker={setClickedOnCreateToDo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
