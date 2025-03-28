import { FormEvent, useState } from "react";
import { useTasksStore } from "@/domains/tasks/tasks-store";

interface Props {
  taskId: string;
  currentTitle: string;
}

export default function UpdateTitleForm({ taskId, currentTitle }: Props) {
  const { updateTask } = useTasksStore();
  const [title, setTitle] = useState(currentTitle);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || title.trim() === currentTitle.trim()) return;
    await updateTask(taskId, { title });
  };

  return (
    <form onSubmit={handleUpdate} className="flex gap-2">
      <input
        type="text"
        className="rounded border px-2 py-1 text-sm"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        className="bg-gray-600 hover:bg-gray-700 rounded px-2 py-1 text-sm text-white"
      >
        Update
      </button>
    </form>
  );
}
