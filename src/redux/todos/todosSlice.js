import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit"; //nanoid
import axios from "axios";
export const getTodoAsync = createAsyncThunk('todos/getTodosAsync', async() => {
  const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}`);
  return res.data;
})


export const addTodoAsync  = createAsyncThunk('todos/addTodoAsync', async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}`, data );
  return res.data;
})
export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: "all",
    addNewTodoLoading: false,
    addNewTodoError: null,
  },

  reducers: {
    // addTodo: {
    //   reducer: (state, action) => {
    //     state.items.push(action.payload);
    //   },
    //   prepare: ({title}) => {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         completed: false,
    //         title,
    //       }
    //     }
    //   }
    // },
    toggle: (state, action) => {
      const { id } = action.payload;

      const item = state.items.find((item) => item.id === id);

      item.completed = !item.completed;
    },
    destroy: (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => item.id !== id);
      state.items = filtered;
    },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.completed === false);
      state.items = filtered;
    },
  },
  extraReducers: {

    //get Todos
    [getTodoAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodoAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodoAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;

      //add Todo    
    },
    [addTodoAsync.pending]: (state, action) => {
      state.addNewTodoLoading = true;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
        state.items.push(action.payload);
        state.addNewTodoLoading = false;
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.addNewTodoLoading = false;
      state.addNewTodoError = action.error.message;
    },
  }
});

export const selectTodos = (state) => state.todos.items;
export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  }

  return state.todos.items.filter((todo) =>
    state.todos.activeFilter === "active"
      ? todo.completed === false
      : todo.completed === true
  );
};
export const {  toggle, destroy, changeActiveFilter, clearCompleted } =
  todosSlice.actions; //addTodo,
export default todosSlice.reducer;
//selectorler, state altındaki herhangi bir elemanı seçtirip, exportlayarak dışarıda kullanabiliyoruz. Böylece kod kalabağının önüne geçip, daha modüler ve component mantığı ile ilerlemiş oluyoruz.

//prepare: Önce dispatch yapılır, eğer prepare varsa, prepare içinde return edilen ifade alınır ve action altına yazılır.