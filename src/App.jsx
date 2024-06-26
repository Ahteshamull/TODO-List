import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import { GrUpdate } from "react-icons/gr";
import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";

const App = () => {
  let [id, setId] = useState("");
  let [updatedTask, setUpdatedTask] = useState("");
  let [edit, setEdit] = useState(false);
  let [task, setTask] = useState("");
  let [todos, setTodos] = useState([]);
  let handleTask = (e) => {
    setTask(e.target.value);
  };

  let handleSubmit = () => {
    const db = getDatabase();
    set(push(ref(db, "todos/")), {
      name: task,
    }).then(() => {
      setTask("");
      alert("Success");
    });
  };
  useEffect(() => {
    const db = getDatabase();
    const todosRef = ref(db, "todos/");
    onValue(todosRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push({ ...item.val(), key: item.key });
        setTodos(array);
      });
    });
    console.log(todos);
  }, []);
  let handleDelete = (id) => {
    const db = getDatabase();
    remove(ref(db, "todos/" + id));
  };
  let handleEdit = (id) => {
    setId(id);
    setEdit(true);
  };
  let handleUpdate = (e) => {
    setUpdatedTask(e.target.value);
  };
  let handleUpdateData = () => {
    const db = getDatabase();
    update(ref(db, "todos/" + id), {
      name: updatedTask,
    }).then(() => { 
      setEdit(false);
      alert("Okay");
    });
  };
  return (
    <div className="mx-auto w-[300px] text-center">
      <h1>Add Todo</h1>
      <input
        onChange={handleTask}
        placeholder="Enter your name"
        className="border rounded-md my-3 px-3"
        type="text"
        value={task}
      />
      <br />
      <button
        onClick={handleSubmit}
        className="bg-teal-500 py-2 px-4 rounded-md mt-4 text-white uppercase"
      >
        Submit
      </button>
      <ul className="bg-gray-300 mt-5 border-[1px] border-black text-green-600 p-2">
        {todos.map((item) => {
          return (
            <li className="mt-2">
              {item.name}
              <button
                onClick={() => handleDelete(item.key)}
                className="bg-red-500 text-white px-2  rounded-full ml-3"
              >
                <MdDelete />
              </button>
              <button
                onClick={() => handleEdit(item.key)}
                className="bg-green-500 text-white px-2  rounded-full ml-3"
              >
                <FaEdit />
              </button>
            </li>
          );
        })}
      </ul>
      {edit && (
        <div className="w-[300px] py-10 bg-slate-600 rounded-md absolute top-0 left-2/4 translate-x-[-50%]">
          <input
            onChange={handleUpdate}
            type="text"
            placeholder="Update your data"
          />
          <button
            onClick={handleUpdateData}
            className="  bg-green-600 p-2 rounded-full ml-4"
          >
            <GrUpdate />
          </button>
          <button
            onClick={() => setEdit(false)}
            className=" absolute top-2 right-2 bg-red-600 p-2 rounded-full"
          >
            <TiArrowBack />
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
