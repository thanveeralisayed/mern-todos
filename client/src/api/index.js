import axios from 'axios'
const url = "http://localhost:3001/todos";

export const readTodo = () => axios.get(url);
export const createTodo = (newTodo) => axios.post(url, newTodo);
export const updateTodo = (id, upTodo) => axios.patch(`${url}/${id}`,upTodo);
export const deleteTodo = (id) => axios.delete(`${url}/${id}`);
