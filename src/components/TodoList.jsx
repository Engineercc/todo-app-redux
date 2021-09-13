import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; //, useSelector
import {
  destroy,
  selectFilteredTodos,
  toggle,
  getTodoAsync
} from "../redux/todos/todosSlice"; //selectTodos
import Error from "./Error";
import Loading from "./Loading";


// let filtered = [];
const TodoList = () => {
  // const items = useSelector(selectTodos);
  // const activeFilter = useSelector((state) => state.todos.activeFilter);

  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);
  useEffect(() => {
    dispatch(getTodoAsync())
  }, [dispatch]);

  const handleDestroy = (id) => {
    if (window.confirm("Are u sure ? ")) {
      dispatch(destroy(id));
    }
  };

  if(isLoading) {
    return <Loading/>;
  }

  if(error) {
    return <Error message={error}/>;
  }

  // filtered = items;
  // console.log(activeFilter);
  // if (activeFilter !== "all") {
  //   filtered = items.filter((todo) =>
  //     activeFilter === "active"
  //       ? todo.completed === false
  //       : todo.completed === true
  //   );
  // }
  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => dispatch(toggle({ id: item.id }))}
            />
            <label>{item.title}</label>
            <button
              className="destroy"
              onClick={() => handleDestroy(item.id)}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
