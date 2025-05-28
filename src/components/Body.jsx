import React, { useEffect } from "react";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const Body = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished,setShowFinished]=useState(true)
  const saveToLS = (newTodos) => {
    localStorage.setItem("todos",JSON.stringify(newTodos))
  }
  useEffect(() => {
    let todos=JSON.parse(localStorage.getItem("todos") || [])
    setTodos(todos)
  }, [])
  
  const handleAddTodo = () => {
    const newTodos=[...todos, { todo, isCompleted: false }];
    setTodos(newTodos)
    setTodo("");
    saveToLS(newTodos)
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleDelete = (key) => {
    let confirmed = window.confirm("Are you sure you want to delete the task?");
    if (confirmed) {
      const newTodos=todos.filter((item, index) => index !== key);
      setTodos(newTodos)
      saveToLS(newTodos)
    }
  };
  const handleToggleIsCompleted = (key) => {
    const updatedTodos = [...todos];
    updatedTodos[key].isCompleted = !updatedTodos[key].isCompleted;
    setTodos(updatedTodos);
    saveToLS(todos)
  };
  const handleEdit = (key) => {
    setTodo(todos[key].todo)
    setTodos(todos.filter((item, index) => index !== key));
    saveToLS(todos)
  }
  const toggleFinished=() => {
    setShowFinished(!showFinished)
  }
  
  return  (
    <>
      <div className="container mx-auto my-5 rounded-xl bg-blue-100 p-10 min-h-[85vh]">
        <div className="">
          <div className="addTodos flex flex-col items-center">
            <h1 className="font-bold text-xl">Add a Todo</h1>
            <div className="addTodo relative w-full flex justify-center">
              <input
                type="text"
                value={todo}
                onChange={handleChange}
                placeholder="add your task"
                className="border py-2 px-3 rounded-4xl w-3/5"
              />
              <button
                onClick={handleAddTodo}
                disabled={todo.length<=3}
                className="border py-2 px-3 mx-4 text-sm font-bold rounded-4xl bg-emerald-800 hover:bg-emerald-900 transition-all text-white relative right-12 border-black disabled:bg-slate-600"
              >
                Add
              </button>
            </div>
          </div>
          <h1 className="font-bold text-xl text-center m-4">Your Todos</h1>
          <input className="ml-4" type="checkbox" checked={showFinished} onChange={toggleFinished}/> Show Finished
          {todos.length === 0 && <div className="text-center text-lg">No Tasks</div>}
          {todos.map((item, index) => {
            return (showFinished||!item.isCompleted) && <div key={index} className="todos">
              <div
                className={
                  item.isCompleted
                    ? "todo flex justify-between items-center rounded-xl py-2 px-3 bg-slate-400 m-4"
                    : "todo flex justify-between items-center rounded-xl py-2 px-3 bg-blue-200 m-4"
                }
              >
                <div className="todoText flex gap-2">
                  <input
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={() => handleToggleIsCompleted(index)}
                    className="m-1"
                  />
                  <div className="todoText text-justify text-wrap">
                    {item.todo}
                  </div>
                </div>
                <div className="todoButtons flex ">
                  <button onClick={() => {
                    handleEdit(index);
                  }
                  } className="m-1 py-2 px-3 ml-4 text-lg font-bold rounded-lg bg-emerald-800 hover:bg-emerald-900 transition-all text-white">
                    <CiEdit />
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(index);
                    }}
                    className="m-1 py-2 px-3 ml-4 text-lg font-bold rounded-lg bg-emerald-800 hover:bg-emerald-900 transition-all text-white"
                  > 
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            </div>
})}
        </div>
      </div>
    </>
  );
};

export default Body;
