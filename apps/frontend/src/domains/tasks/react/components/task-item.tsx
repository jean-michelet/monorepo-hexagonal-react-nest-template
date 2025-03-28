import { useTasksStore } from "@/domains/tasks/tasks-store";
import AssignForm from "./assign-form";
import UpdateTitleForm from "./update-title-form";
import { ITask } from "@avicenne/shared/tasks";

interface Props {
  task: ITask;
}

export default function TaskItem({ task }: Props) {
  const { updateTask, unassignTask, dismissNotification, notifiedTaskIds } =
    useTasksStore();

  const toggleComplete = async () => {
    await updateTask(task.id, { isCompleted: !task.isCompleted });
  };

  const handleClick = () => {
    dismissNotification(task.id);
  };

  const isNew = notifiedTaskIds.includes(task.id);

  return (
    <li
      onClick={handleClick}
      className={`flex cursor-pointer flex-col gap-2 rounded border p-4 ${
        isNew ? "border-blue-400 bg-blue-50" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="font-semibold">{task.title}</span>
          {task.isCompleted ? (
            <span className="ml-2 text-green-600">[Completed]</span>
          ) : (
            <span className="ml-2 text-orange-500">[Pending]</span>
          )}
        </div>
        <button onClick={toggleComplete} className="rounded px-2 py-1 text-sm">
          {task.isCompleted ? "Mark Incomplete" : "Mark Complete"}
        </button>
      </div>

      <div className="flex items-center gap-2">
        {task.assignedUser ? (
          <>
            <span className="text-sm">
              Assigned to: {task.assignedUser.name} (ID: {task.assignedUser.id})
            </span>
            <button
              onClick={() => unassignTask(task.id)}
              className="text-xs text-red-500 hover:underline"
            >
              Unassign
            </button>
          </>
        ) : (
          <AssignForm taskId={task.id} />
        )}
      </div>

      <UpdateTitleForm taskId={task.id} currentTitle={task.title} />
    </li>
  );
}
