"use client";

import { useState, type ChangeEvent } from "react";
import type { Task } from "~/app/core/shared/lib/provider/reducer-and-context"; // Assuming Task interface is exported from TasksContext
import {
  useTasks,
  useTasksDispatch
} from "~/app/core/shared/lib/provider/reducer-and-context";

export function AddTask(): JSX.Element {
  const [text, setText] = useState("");
  const dispatch = useTasksDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleAddTask = () => {
    setText("");
    dispatch({
      type: "added",
      id: nextId++,
      text: text
    });
  };

  return (
    <div className="flex">
      <input placeholder="Add task" value={text} onChange={handleChange} />
      <button type="button" onClick={handleAddTask}>
        Add
      </button>
    </div>
  );
}

let nextId = 3;

export function TaskList(): JSX.Element {
  const tasks = useTasks();
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem task={task} />
        </li>
      ))}
    </ul>
  );
}

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "changed",
      task: {
        ...task,
        text: e.target.value
      }
    });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "changed",
      task: {
        ...task,
        done: e.target.checked
      }
    });
  };

  const handleDelete = () => {
    dispatch({
      type: "deleted",
      id: task.id
    });
  };

  let taskContent: JSX.Element;
  if (isEditing) {
    taskContent = (
      <>
        <input value={task.text} onChange={handleChange} />
        <button type="button" onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={handleCheckboxChange}
      />
      {taskContent}
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </label>
  );
}
