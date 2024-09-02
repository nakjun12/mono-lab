import { AddTask, TaskList } from "~/app/core/example/components/todo-list";
import { TasksProvider } from "~/app/core/shared/lib/provider/reducer-and-context";

export default function TaskApp() {
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}
