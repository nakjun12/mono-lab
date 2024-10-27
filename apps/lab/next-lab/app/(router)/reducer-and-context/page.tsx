import { AddTask, TaskList } from "~/app/core/example/components/todo-list";
import { TasksProvider } from "~/app/core/shared/lib/provider/reducer-and-context";

export default function TaskApp() {
  return (
    <TasksProvider>
      <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
        <h1>Day off in Kyoto</h1>
        <AddTask />
        <TaskList />
      </div>
    </TasksProvider>
  );
}
