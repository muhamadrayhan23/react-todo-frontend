import React, { useState } from "react";
import { createTodo } from "../services/todoApi"

const InputTodo = () => {
    const [todo, setTodo] = useState("");
    const [description, setDescription] = useState("");
    const [loading] = useState(false);

    const handleSubmit = () => {

        if (!todo) {
            alert("Todo tidak boleh kosong!");
            return;
        };

        if (!description) {
            alert("Deskripsi tidak boleh kosong!");
            return;
        };

        const confirmAdd = confirm("Tambahkan todo?");
        if (!confirmAdd) return;
        if (confirmAdd) {
            alert("Todo berhasil ditambahkan!")
        };

        createTodo({ todo, description })
            .then(() => {
                setTodo("");
                setDescription("");
                reload();
            })
            .catch((err) => console.error("Error POST:", err));
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} id="form-todo" className="flex flex-col flex-no-wrap justify-center items-stretch content-between
">
                <input type="text" name="content" placeholder="Todo..." value={todo} onChange={(e) => setTodo(e.target.value)} className="flex-1 px-2 py-3 rounded-lg border block flex-grow-0 flex-shrink self-auto order-none mb-4" />
                <textarea placeholder="Description...." value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded block flex-grow-0 flex-shrink self-auto order-none" />
                <button disabled={loading} className="bg-blue-500 m-6 hover:bg-blue-700 text-white py-2 px-1 border border-blue-700 rounded">{loading ? "saving..." : "Add Todo"}</button>
            </form>
        </div>
    )
};

export default InputTodo;