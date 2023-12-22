import axios from "axios";

export const getAllTodosList = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/todos`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postTodosList = async (data) => {
  try {
    const response = await axios.post(`http://localhost:5000/todos`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTodosList = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/todos/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const putTodosList = async (payload) => {
  const {editTodoId,todos}=payload;
  try {
    const response = await axios.put(`http://localhost:5000/todos/${editTodoId}`,todos);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const isComplitedTodo = async (id) => {
  try {
    const response = await axios.put(`http://localhost:5000/todos/${id}/complete`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
