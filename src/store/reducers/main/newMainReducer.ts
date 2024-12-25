import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";

import mainInitState, { MainState } from "./mainInitState";

const test2: SliceCaseReducers<MainState> = {
  test2(state, action) {},
};

const todosSlice = createSlice({
  name: "main",
  initialState: mainInitState,
  reducers: {
    todoAdded(state, action) {
      /* const { id, text } = action.payload
      state.todos.push({
        id,
        text,
        completed: false
      }) */
    },
    todoToggled(state, action) {
      /* const matchingTodo = state.todos.find(todo => todo.id === action.payload)

      if (matchingTodo) {
        matchingTodo.completed = !matchingTodo.completed
      } */
    },
    ...test2,
  },
});

export const { todoAdded, todoToggled } = todosSlice.actions;

export default todosSlice.reducer;
