import React, { useState } from "react";

const ListTodo = ({ todos, onUpdate, onDelete }) => {
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");

    // Handle tombol edit
    const handleEdit = (idx) => {
        setEditIndex(idx);
        setEditValue(todos[idx]);
    };

    // Handle tombol save
    const handleSave = (idx) => {
        if (!editValue) return;
        onUpdate(idx, editValue);
        setEditIndex(null);
        setEditValue("");
    };

    // Handle tombol cancel
    const handleCancel = () => {
        setEditIndex(null);
        setEditValue("");
    };


    return (
        <ul id="todo-list" className="space-y-3 m-6">
            {todos.map((t, idx) => (
                <li key={idx} className="flex items-center justify-between bg-white rounded shadow-sm px-4 py-3 border border-gray-200 hover:shadow transition">
                    {editIndex === idx ? (
                        <>
                            <div className="flex w-full gap-3 items-center">
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}

                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleSave(idx);
                                        if (e.key === "Escape") handleCancel();
                                    }}
                                    className="flex-1 px-2 py-3 rounded-lg border"
                                />
                                <button onClick={() => handleSave(idx)} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-1 border border-blue-700 rounded">
                                    Save
                                </button>
                                <button onClick={handleCancel} className="bg-transparent px-1 py-2 rounded border border-blue-700 hover:bg-grey">
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <span className="flex-1">{t}</span>
                            <button onClick={() => handleEdit(idx)} className="bg-yellow-500 text-white py-2 px-1 border border-white-100 rounded">
                                Edit
                            </button>
                            <button onClick={() => onDelete(idx)} className="bg-red-500 text-white py-2 px-1 border rounded">
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