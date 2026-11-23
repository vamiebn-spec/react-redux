import { createSlice, nanoid } from "@reduxjs/toolkit";

const defaultTasks = [
  { id: "task-1", description: "Préparer le planning de la semaine", isDone: true },
  { id: "task-2", description: "Terminer le projet React avec Redux", isDone: false },
  { id: "task-3", description: "Faire le point sur les objectifs du mois", isDone: false },
];

const getInitialTasks = () => {
  try {
    const saved = localStorage.getItem("taskflow-tasks");
    return saved ? JSON.parse(saved) : defaultTasks;
  } catch {
    return defaultTasks;
  }
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: getInitialTasks(),
  },
  reducers: {
    addTask: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(description) {
        return {
          payload: {
            id: nanoid(),
            description,
            isDone: false,
          },
        };
      },
    },
    editTask(state, action) {
      const task = state.items.find((item) => item.id === action.payload.id);
      if (task) task.description = action.payload.description;
    },
    deleteTask(state, action) {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
    toggleTask(state, action) {
      const task = state.items.find((item) => item.id === action.payload);
      if (task) task.isDone = !task.isDone;
    },
  },
});

export const { addTask, editTask, deleteTask, toggleTask } = tasksSlice.actions;
export default tasksSlice.reducer;