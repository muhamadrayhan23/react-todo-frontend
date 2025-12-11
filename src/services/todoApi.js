import axios from "axios";

// Base URL API dari Backend
const API_URL = "http://localhost:3000/api/todo";

// POST - Tambah Todo
export const createTodo = (data) => {
    return axios.post(API_URL, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// GET
export const getTodos = () => {
    return axios.get(API_URL);
};

// GET By Id
export const getTodoById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

// PUT - Update
export const updateTodo = (id, data) => {
    return axios.put(`${API_URL}/${id}`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// DELETE
export const deleteTodo = (id) => {
    return axios.delete(`${API_URL}/${id}`);
}