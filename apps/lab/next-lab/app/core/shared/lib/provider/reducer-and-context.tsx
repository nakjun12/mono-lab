"use client";

import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode
} from "react";

export interface Task {
  id: number;
  text: string;
  done: boolean;
}

type TaskAction =
  | { type: "added"; id: number; text: string }
  | { type: "changed"; task: Task }
  | { type: "deleted"; id: number };

const TasksContext = createContext<Task[] | null>(null);
const TasksDispatchContext = createContext<Dispatch<TaskAction> | null>(null);

interface TasksProviderProps {
  children: ReactNode;
}

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks(): Task[] {
  const context = useContext(TasksContext);
  if (context === null) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}

export function useTasksDispatch(): Dispatch<TaskAction> {
  const context = useContext(TasksDispatchContext);
  if (context === null) {
    throw new Error("useTasksDispatch must be used within a TasksProvider");
  }
  return context;
}

function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false
        }
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw new Error("Unknown action: " + (action as any).type);
    }
  }
}

const initialTasks: Task[] = [
  { id: 0, text: "Philosopher", done: true },
  { id: 1, text: "Visit the temple", done: false },
  { id: 2, text: "Drink matcha", done: false }
];
