import Mongoose from "mongoose";
import Todo from "../models/todos.js";

export const readTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}


export const createTodo = async (req, res) => {
    const todo = new Todo(req.body);
    console.log(todo);
    try {
        await todo.save();
        res.status(201).json(todo);
    }
    catch (err) {
        res.status(409).json({ error: err.message });
    }
}

export const updateTodo = async (req, res) => {
    const {id} = req.params;
    const {title,content} = req.body;
    if (!Mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('not a valid id');
    }

    const todo = {_id:id,title,content};
    console.log(todo);
    await Todo.findByIdAndUpdate(id,todo,{new:true});
    res.json(todo);
}


export const deleteTodo = async (req, res) => {
    const {id} = req.params;
    if (!Mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('not a valid id');
    }
    await Todo.findByIdAndRemove(id);
    res.json({message:'todo deleted succesfully'});
}