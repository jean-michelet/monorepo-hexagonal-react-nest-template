import { useTasksStore } from "@/domains/tasks/tasks-store";
import { FormEvent, useState } from "react";

export default function CreateTaskForm() {
  const { createTask } = useTasksStore();
  const [title, setTitle] = useState("");
  const [assigneeId, setAssigneeId] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await createTask({ title, assigneeId: assigneeId || undefined });
    setTitle("");
    setAssigneeId("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          className="border rounded px-2 py-1"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Assignee ID
        </label>
        <input
          className="border rounded px-2 py-1"
          type="text"
          value={assigneeId}
          onChange={(e) => setAssigneeId(e.target.value)}
          placeholder="Optional..."
        />
      </div>
      <button
        type="submit"
        className="self-end bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create
      </button>
    </form>
  );
}
