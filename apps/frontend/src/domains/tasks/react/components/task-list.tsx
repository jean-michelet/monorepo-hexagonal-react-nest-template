import { useTasksStore } from "@/domains/tasks/tasks-store";
import TaskItem from "./task-item";

export default function TaskList() {
  const { tasks, notifiedTaskIds } = useTasksStore();

  return (
    <div>
      {notifiedTaskIds.length > 0 && (
        <div className="mb-4 rounded bg-blue-100 p-2 text-sm text-blue-800">
          {notifiedTaskIds.length} task{notifiedTaskIds.length > 1 ? "s" : ""}{" "}
          created
        </div>
      )}

      <ul className="space-y-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
