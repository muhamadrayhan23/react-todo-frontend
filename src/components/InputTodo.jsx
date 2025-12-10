import React, { useState } from "react";

const InputTodo = ({ onAdd }) => {
    const [value, setValue] = useState("");

    const handdleSubmit = (e) => {
        e.preventDefault();
        // Jika to do list belum di isi saat submit
        if (!value) {
            alert("To Do List belum di isi");
            return;
        };

        const oke = confirm("Tambahkan todo?")
        if (oke) {
            onAdd(value);
        }

        setValue("");
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handdleSubmit} id="form-todo" className="flex items-center justify-between bg-white rounded border px-4 py-3">
                <input type="text" name="content" placeholder="Masukkan to do list..." value={value} onChange={(e) => setValue(e.target.value)} className="flex-1 px-2 py-3 rounded-lg border" />
                <button type="submit" id="todo-submit" className="bg-blue-500 m-6 hover:bg-blue-700 text-white py-2 px-1 border border-blue-700 rounded">Add Todo</button>
            </form>
        </div>
    )
};

export default InputTodo;