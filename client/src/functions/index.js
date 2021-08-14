import * as api from '../api';

export const readTodos = async () => {
    try {
        const {data} = await api.readTodo();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const createTodos = async (todo) => {
    try {
        const {data} = await api.createTodo(todo);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const updateTodos = async (id,upTodo)=>{
    try {
        const {data} = await api.updateTodo(id,upTodo);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteTodos = async (id)=>{
    try {
        const {data} = await api.deleteTodo(id);
        return data;
    } catch (error) {
        console.log(error);
    }
}