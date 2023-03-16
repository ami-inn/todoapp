import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

    


  function deleteItem(i) {
    let newTodo = todos.filter((item, index) => {
      return index != i; //removing the passing value
    });
    setTodos(newTodo);
    localStorage.setItem("todo", JSON.stringify([...newTodo]));
  }

  function handleSubmit(e) {
    e.preventDefault(); //submit prevent cheyyan
    console.log("hai"+todo.trim()+"hell")
    if(todo.trim()){ //removing the space and check
      setTodos([...todos,{ text:todo , status:false}])
    localStorage.setItem("todo", JSON.stringify([...todos,{ text:todo , status:false}]))//key value

    }
    
    setTodo('')
  }

  function completeTodo(i) {

    let newTodo = todos.map((item, index) => {
      if (index == i) {
        item.status =!item.status;
      }
      return item;
    });
    setTodos(newTodo);
    localStorage.setItem("todo", JSON.stringify([...newTodo]));
  }

  const todoInputRef=useRef();
  // console.log(todoInputRef.current)
  useEffect(()=>{
    todoInputRef.current.focus();
    if(localStorage.getItem('todo')){ //key from handlesum
      setTodos(JSON.parse(localStorage.getItem('todo')))
    }
    // todoInputRef.current.style.color="red"
  },[])



  return (
    <div className="App">
      <div className="todo-app">
        <h1>What's the Plan for Today?</h1>

        <form onSubmit={handleSubmit} className="todo-form">
          <input
            value={todo}
            ref={todoInputRef} onChange={(event) => setTodo(event.target.value)}
            type="text"
            placeholder="update your item"
            className="todo-input edit"
          />
          <button onClick={handleSubmit} className="todo-button edit">
            Update
          </button>
        </form>

        {todos.map((value, index) => {
          return (
            <div
              className={value.status ? "todo-row complete" : "todo-row"}
              key={index}
            >
              <div key={index} onClick={()=>completeTodo(index)}>
                {value.text}
                </div>

              <div className="icons">
                <RiCloseCircleLine
                  onClick={() => deleteItem(index)}
                  className="delete-icon"
                />
                <TiEdit />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
