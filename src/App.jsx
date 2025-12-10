import React, { useEffect, useState } from "react";
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";

function App() {
  // Ambil dta dari localstorage saat pertama kali di render
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todo");
    return saved ? JSON.parse(saved) : [];
  });
  console.log(todos);

  // Simpan setiap kali ada perubahan
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (idx, newValue) => {
    const newTodos = [...todos];
    newTodos[idx] = newValue;
    const edit = confirm("Perbarui todo?");
    if (edit) {
      setTodos(newTodos);
    }
  }

  const deleteTodo = (idx) => {
    const onDelete = confirm("Yakin ingin hapus todo?");
    if (!onDelete) return;

    const newTodos = todos.filter((_, i) => i !== idx);
    setTodos(newTodos);
  };

  return (
    <>
      <div className="container max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-center font-bold mt-6 text-2xl">To Do List App</h1>
        <InputTodo onAdd={addTodo} />
        <ListTodo todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
      </div>
    </>
  );
};

export default App;