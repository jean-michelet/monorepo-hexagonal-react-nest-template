import { useEffect } from "react";
import { useTasksStore } from "@/domains/tasks/tasks-store";
import Layout from "@/ui/layouts/layout";
import CreateTaskForm from "../components/create-task-form";
import TaskList from "../components/task-list";

export default function TasksPage() {
  const { fetchTasks, loading, error } = useTasksStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <Layout>
      <div className="mx-auto max-w-3xl p-4">
        <h1 className="mb-6 text-2xl font-bold">Tasks</h1>

        <CreateTaskForm />

        {loading && <p className="text-blue-700">Loading tasks...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && <TaskList />}
      </div>
    </Layout>
  );
}
