import React, { useEffect, useState } from "react";
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";
import { getTodos, createTodo } from "./services/todoApi";

function App() {
  const [todos, setTodos] = useState([]);

  // GET
  const loadTodos = () => {
    getTodos()
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Error GET:", err));
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <>
      <div className="container max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-center font-bold mt-6 text-2xl">To Do List React + Expess & Mysql</h1>
        <InputTodo reload={loadTodos} />
        <ListTodo todos={todos} reload={loadTodos} />
      </div>
    </>
  );
};

export default App;