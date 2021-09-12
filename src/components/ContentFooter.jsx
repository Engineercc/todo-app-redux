/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveFilter, clearCompleted, selectTodos } from "../redux/todos/todosSlice";

const ContentFooter = () => {
  const items = useSelector(selectTodos);
  const itemsLeft = items.filter((item) => !item.completed).length;
  const activeFilter = useSelector((state) => state.todos.activeFilter);
  const dispatch = useDispatch();
  
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft} </strong>
        item{itemsLeft > 1 && "s"} left
      </span>

      <ul className="filters">
        <li>
          <a
            className={activeFilter === "all" ? "selected" : ""}
            onClick={() => {
              dispatch(changeActiveFilter("all"));
            }}
          >
            All
          </a>
        </li>
        <li>
          <a
            className={activeFilter === "active" ? "selected" : ""}
            onClick={() => {
              dispatch(changeActiveFilter("active"));
            }}
          >
            Active
          </a>
        </li>
        <li>
          <a
            className={activeFilter === "completed" ? "selected" : ""}
            onClick={() => {
              dispatch(changeActiveFilter("completed"));
            }}
          >
            Completed
          </a>
        </li>
      </ul>

      <button className="clear-completed" onClick={() => dispatch(clearCompleted())}>Clear completed</button>
    </footer>
  );
};

export default ContentFooter;
