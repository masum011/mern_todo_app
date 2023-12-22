import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteTodosList, getAllTodosList, isComplitedTodo, postTodosList, putTodosList } from "../../services/services";

const initialState = {
  data: [],
  status:"hhv",
  actiondata:'',
  error:null
};

export const alltodoslist = createAsyncThunk("fetchTodos", async () => {
  try {
    const data = await getAllTodosList();
    return data;
  } catch (error) {
    throw error;
  }
});

export const createTodoslist = createAsyncThunk("createTodos", async (payload) => {
  try {
    const data = await postTodosList(payload);
    return data;
  } catch (error) {
    throw error;
  }
});


export const delTodoslist = createAsyncThunk("deleteTodos", async (id) => {
  try {
    const data = await deleteTodosList(id);
    return data;
  } catch (error) {
    throw error;
  }
});


export const editTodoslist = createAsyncThunk("editTodos", async (payload) => {
  try {
    const data = await putTodosList(payload);
    return data;
  } catch (error) {
    throw error;
  }
});

export const complitedTodo = createAsyncThunk("complitedTodos", async (id) => {
  try {
    const data = await isComplitedTodo(id);
    return data;
  } catch (error) {
    throw error;
  }
});

export const todosSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(alltodoslist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(alltodoslist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(alltodoslist.rejected, (state, action) => {
        console.log(action);
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(createTodoslist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTodoslist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.actiondata=action.meta.requestId
      })
      .addCase(createTodoslist.rejected, (state, action) => {
        console.log(action);
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(delTodoslist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(delTodoslist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.actiondata=action.meta.requestId
      })
      .addCase(delTodoslist.rejected, (state, action) => {
        console.log(action);
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(editTodoslist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editTodoslist.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.editdata = action.payload;
        state.actiondata=action.meta.requestId

      })
      .addCase(editTodoslist.rejected, (state, action) => {
        console.log(action);
        state.status = "failed";
        state.error = action.error.message;
      })


      .addCase(complitedTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(complitedTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.editdata = action.payload;
        state.actiondata=action.meta.requestId

      })
      .addCase(complitedTodo.rejected, (state, action) => {
        console.log(action);
        state.status = "failed";
        state.error = action.error.message;
      })

  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = todosSlice.actions;

export default todosSlice.reducer;
