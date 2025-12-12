import React, { useEffect, useState } from "react";
import { getTodos, updateTodo, deleteTodo } from "../services/todoApi";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TodoPdf from "./TodoPdf"

const ListTodo = () => {
    const [todos, setTodos] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [checked, setChecked] = useState({}); // simpan status checkbox

    // GET - Ambil data dari API Backend
    const loadTodos = () => {
        getTodos()
            .then((res) => {
                setTodos(res.data);

                // Buat default false untuk semua checkbox
                const defaultCheck = {};
                res.data.forEach(t => (defaultCheck[t.id] = false));
                setChecked(defaultCheck);
            })
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

    // PUT - Save
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
            .catch((err) => console.error("Error PUT:", err));
    };

    // DELETE
    const handleDelete = (id) => {
        if (!confirm("Yakin ingin menghapus todo?")) return;

        deleteTodo(id)
            .then(() => {
                alert("Todo berhasil dihapus");
                loadTodos();
            })
            .catch((err) => console.error("Error DELETE:", err));
    };

    // Handle checkbox
    const toggleCheck = (id) => {
        setChecked((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Progress bar hitung jumlah centang
    const totalChecked = Object.values(checked).filter(Boolean).length;
    const progress = todos.length ? (totalChecked / todos.length) * 100 : 0;

    return (
        <div className="mt-10 px-4 ">

            {/* Progress Bar */}
            <div className="mb-6">
                <p className="font-semibold mb-1">
                    Progress: {totalChecked}/{todos.length}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                        className="bg-blue-500 h-4 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <ul className="space-y-3">
                {todos.map((t) => (
                    <li key={t.id} className="flex items-center gap-4 bg-white rounded shadow-sm px-4 py-3 border">

                        {/* Checkbox */}
                        <input
                            type="checkbox"
                            checked={checked[t.id] || false}
                            onChange={() => toggleCheck(t.id)}
                            className="w-5 h-5"
                        />

                        {/* Mode edit */}
                        {editIndex === t.id ? (
                            <div className="flex w-full gap-3">
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    autoFocus
                                    className="flex-1 px-2 py-2 border rounded-lg"
                                />
                                <textarea
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    className="border p-2 rounded flex-1"
                                />

                                <button onClick={() => handleSave(t.id)} className="bg-blue-500 text-white px-3 py-1 rounded">
                                    Save
                                </button>
                                <button onClick={handleCancel} className="bg-gray-100 px-3 py-1 rounded">
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Text yang dicoret jika checkbox di centang */}
                                <div className="flex-1">
                                    <p className={`font-medium ${checked[t.id] ? "line-through text-gray-400" : ""}`}>
                                        {t.todo}
                                    </p>
                                    <p className={`text-sm ${checked[t.id] ? "line-through text-gray-400" : "text-gray-600"}`}>
                                        {t.description}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleEdit(t)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(t.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <PDFDownloadLink document={<TodoPdf todos={todos} fileName="todo-list.pdf" />}>
                {({ loading }) =>
                    loading ? "Generating PDF..." : (
                        <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">Download PDF</button>
                    )
                }
            </PDFDownloadLink>
        </div>

    );
};

export default ListTodo;
