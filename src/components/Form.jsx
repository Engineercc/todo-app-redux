// import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAsync } from "../redux/todos/todosSlice";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import Error from "./Error";

const Form = () => {
  const [title, setTitle] = useState("");
  const isLoading = useSelector((state) => state.todos.addNewTodoLoading);
  const error = useSelector((state) => state.todos.addNewTodoError);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    if (!title) {
      return;
    }
    await dispatch(addTodoAsync({ title }));
    setTitle("");
    e.preventDefault();
  };

  if(error) {
    alert(error);
    return ;
  }
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center" }}
    >
      <input
        disabled={isLoading}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {isLoading && <Loading />}
      {/* {error & <Error message={error}/>} */}
    </form>
  );
};

export default Form;
