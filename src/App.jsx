import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, push, onValue } from "firebase/database";

const App = () => {
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
        array.push(item.val());
        setTodos(array);
      });
    });
    console.log(todos);
  }, []);

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
      <ul className="bg-gray-300 mt-5 border-[1px] border-black text-green-600 ">
        {todos.map((item) => {
          return <li>{ item.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default App;
