import React, { useEffect, useState } from "react";
import Preloader from "./Components/Preloader";
import { createTodos, deleteTodos, readTodos, updateTodos } from "./functions";



function App() {

  const [todo, setTodo] = useState({ title: '', content: '' })
  const [todoArray, setTodoArray] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  

 

  useEffect(() => {
    const currentTodo = currentId !== 0 ?
      todoArray.find(todoitem => todoitem._id === currentId) : { title: '', content: '' };
    setTodo(currentTodo);
  }, [currentId])


  const fetchData = async () => {
    const result = await readTodos();
    setTodoArray(result);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const onClearHandler = () => {
    setTodo({ title: '', content: '' });
    setCurrentId(0);
  }

  const onDeleteHandler = async (id) => {
    setTodo({ title: '', content: '' });
    await deleteTodos(id);
    fetchData();
  }


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      await createTodos(todo);
    }
    else{
      await updateTodos(currentId,todo); 
    }
    setTodo({ title: '', content: '' });
    setCurrentId(0);
    fetchData();
  }


  return (
    <div className="container">

      <form className="pt-5" onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title"
            value={todo.title}
            onChange={e => setTodo({ ...todo, title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Content</label>
          <input type="text" className="form-control" id="desc"
            onChange={e => setTodo({ ...todo, content: e.target.value })}
            value={todo.content}
        />
        </div>

        <div className="d-flex flex-column align-items-center ">
          <button type="submit" style={{ width: "30%" }} className="btn btn-primary ">{currentId !== 0 ? 'Update' : 'Add'}</button>
          <a href="##" onClick={onClearHandler} style={{ width: "30%" }} className="btn btn-sm btn-danger my-2 py-2">Clear</a>
        </div>


      </form>

      {todoArray.length === 0 ? <Preloader /> : <div className="d-flex justify-content-center"></div>}


      <ul className="list-group pt-5">
        {todoArray ? todoArray.map((toitem) => {
          return (
            <li key={toitem._id} style={{ cursor: "pointer" }} className="list-group-item">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{toitem.title}</h5>
                  <p className="card-text">{toitem.content}.</p>
                  <a onClick={()=>onDeleteHandler(toitem._id)} className="btn btn-danger">Delete</a>
                  <a onClick={() => setCurrentId(toitem._id)} className="btn btn-primary mx-2">Edit</a>
                </div>
              </div>
            </li>
          )
        }) : null}

        {todo.title ? <li style={{ cursor: "pointer" }} className="list-group-item">
          <div style={{ cursor: "default" }} className="card">
            <div className="card-body">
              <h5 className="card-title text-muted">{todo.title}</h5>
              <p className="card-text text-muted">{todo.content}</p>
              <a onClick={onSubmitHandler} className="btn btn-primary">Add</a>
            </div>
          </div>
        </li>
          : ''}
      </ul>



    </div>
  );
}

export default App;
