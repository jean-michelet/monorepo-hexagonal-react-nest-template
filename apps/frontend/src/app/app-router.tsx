import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./root-pages/home-page";
import TasksPage from "@/domains/tasks/react/pages/tasks-page";
import UsersPage from "@/domains/users/react/pages/users-page";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
