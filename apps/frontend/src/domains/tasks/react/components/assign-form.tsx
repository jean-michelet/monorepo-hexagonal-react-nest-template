import { useTasksStore } from "@/domains/tasks/tasks-store";
import { FormEvent, useState } from "react";

interface Props {
  taskId: string;
}

export default function AssignForm({ taskId }: Props) {
  const { assignTask } = useTasksStore();
  const [assigneeId, setAssigneeId] = useState("");

  const handleAssign = async (e: FormEvent) => {
    e.preventDefault();
    if (!assigneeId.trim()) return;
    await assignTask(taskId, assigneeId);
    setAssigneeId("");
  };

  return (
    <form onSubmit={handleAssign} className="flex items-center gap-2">
      <input
        type="text"
        className="border rounded px-2 py-1 text-sm"
        placeholder="Assignee ID"
        value={assigneeId}
        onChange={(e) => setAssigneeId(e.target.value)}
      />
      <button
        type="submit"
        className="bg-gray-600 text-white rounded px-2 py-1 text-sm hover:bg-gray-700"
      >
        Assign
      </button>
    </form>
  );
}
