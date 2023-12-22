import React, { useState } from "react";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { MdOutlineModeEditOutline, MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoAdd } from "react-icons/io5";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  alltodoslist,
  complitedTodo,
  createTodoslist,
  delTodoslist,
  editTodoslist,
} from "./todosSlice";
import { useEffect } from "react";

function formatDateString(inputDateString) {
  const originalDate = new Date(inputDateString);
  const formattedDate = originalDate.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formattedDate;
}

export default function Todos() {
  const dispatch = useDispatch();
  const { data, status, actiondata } = useSelector((state) => state.todos);
  const initialstate = {
    title: "",
    description: "",
    completed: false,
    dueDate: "",
  };
  const [todos, setTodos] = useState(initialstate);
  const [editBtn, setEditBtn] = useState(false);
  const [editTodoId, setEditTodoId] = useState("");
  useEffect(() => {
    dispatch(alltodoslist());
  }, [actiondata]);
  const handlechange = (e) => {
    const { name, value } = e.target;
    setTodos((prestate) => ({
      ...prestate,
      [name]: value,
    }));
  };

  const handleAddTodos = () => {
    if (todos.title && todos.description && todos.dueDate) {
      dispatch(createTodoslist(todos));
      toast.success("Create todos!");
      setTodos(initialstate);
    }
  };

  const handletodosdelete = (id) => {
    dispatch(delTodoslist(id));
    toast.success("Todo deleted successfully");
  };

  const handleedittodos = (items) => {
    setTodos(items);
    setEditTodoId(items._id);
    setEditBtn(true);
  };

  const handleUpdateTodo = () => {
    const payload = {
      todos,
      editTodoId,
    };
    dispatch(editTodoslist(payload));
    toast.success("Todo update completed");
  };

  const handlecancel = () => {
    setEditBtn(false);
    setTodos(initialstate);
  };
  const handleTodoComplited = (id) => {
    dispatch(complitedTodo(id));
    toast.success("Task completed");
  };

  return (
    <div>
      <header>
        <p>Todo App</p>
      </header>
      <main>
        <div className="contaner">
          <div className="todos--inputs">
            <input
              type="text"
              name="title"
              value={todos.title}
              placeholder="Todos Title"
              onChange={handlechange}
            />
            <input
              type="text"
              name="description"
              value={todos.description}
              placeholder="Todos Description"
              onChange={handlechange}
            />
            <input
              type="date"
              placeholder="due date"
              name="dueDate"
              value={todos.dueDate}
              onChange={handlechange}
            />

            {editBtn ? (
              <div className="editbtn">
                <button onClick={handleUpdateTodo}>Update</button>
                <button onClick={handlecancel}>Cancle</button>
              </div>
            ) : (
              <button onClick={handleAddTodos}>
                Add <IoAdd size={"10px"} />
              </button>
            )}
          </div>
          <div className="todos--scroll">
            {data?.length > 0 ? (
              data.map((items) => (
                <div className="todos--contents" key={items._id}>
                  <div className="todos--list">
                    <RiCheckboxCircleLine
                      size={"25px"}
                      color={items.completed ? "blue" : ""}
                      onClick={() => handleTodoComplited(items._id)}
                    />
                    <div className="todos--title">
                      <p>
                        {items.completed ? (
                          <del>{items.title}</del>
                        ) : (
                          items.title
                        )}
                      </p>
                      <p>
                        {items.completed ? (
                          <del>{items.description}</del>
                        ) : (
                          items.description
                        )}
                      </p>
                      <p>
                        {items.completed ? (
                          <del>{formatDateString(items.dueDate)} </del>
                        ) : (
                          formatDateString(items.dueDate)
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="todos--event">
                    <MdOutlineModeEditOutline
                      size={"20px"}
                      onClick={() => handleedittodos(items)}
                    />
                    <MdDeleteOutline
                      size={"20px"}
                      onClick={() => handletodosdelete(items._id)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="empty--data">
                {status === "loading" ? "loading..." : " No todos to display"}
              </p>
            )}
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
