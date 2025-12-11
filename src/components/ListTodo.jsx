import React, { useEffect, useState } from "react";
import { getTodos, updateTodo, deleteTodo } from "../services/todoApi"

const ListTodo = () => {
    const [todos, setTodos] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [editDescription, setEditDescription] = useState("");

    // GET - Ambil data dari API Backend
    const loadTodos = () => {
        getTodos()
            .then((res) => setTodos(res.data))
            .catch((err) => console.error("Error GET:", err));
    };

    useEffect(() => {
        loadTodos();
    }, []);

    // Handle EDIT
    const handleEdit = (todo) => {
        setEditIndex(todo.id);
        setEditValue(todo.todo);
        setEditDescription(todo.description);
    };

    // Handle CANCEL
    const handleCancel = () => {
        setEditIndex(null);
        setEditValue("");
        setEditDescription("");
    };

    // PUT - Update ke API Backend
    const handleSave = (id) => {
        if (!editValue) {
            alert("Todo tidak boleh kosong!");
            return;
        }

        updateTodo(id, {
            todo: editValue,
            description: editDescription,
        })

            .then(() => {
                const edit = confirm("Update todo?");
                if (edit) {
                    alert("Todo berhasil diperbarui!");
                    loadTodos();
                    handleCancel();
                }
            })
            .catch((err) => console.err("Error PUT:", err))
    };

    // DELETE - Hapus ke API Backend
    const handleDelete = (id) => {
        if (!confirm("Yakin ingin menghapus todo?")) return;

        deleteTodo(id)
            .then(() => {
                alert("Todo berhasil di hapus");
                loadTodos();
            })
            .catch((err) => console.error("Error DELETE:", err))
    }


    return (
        <ul className="space-y-3 m-6">
            {todos.map((t) => (
                <li key={t.id} className="flex items-center justify-between bg-white rounded shadow-sm px-4 py-3 border border-gray-200 hover:shadow transition">
                    {editIndex === t.id ? (
                        <>
                            <div className="flex w-full gap-3 items-center">
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}

                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleSave();
                                        if (e.key === "Escape") handleCancel();
                                    }}
                                    className="flex-1 px-2 py-3 rounded-lg border"
                                />
                                <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="border p-2 rounded" />
                                <button onClick={() => handleSave(t.id)} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-1 border border-blue-700 rounded">
                                    Save
                                </button>
                                <button onClick={handleCancel} className="bg-transparent px-1 py-2 rounded border border-blue-700 hover:bg-grey">
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <span className="flex-1">{t.todo}</span>
                            <span className="flex-1 text-gray-500">{t.description}</span>
                            <button onClick={() => handleEdit(t)} className="bg-yellow-500 text-white py-2 px-1 border border-white-100 rounded">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(t.id)} className="bg-red-500 text-white py-2 px-1 border rounded">
                                Delete
                            </button>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default ListTodo;