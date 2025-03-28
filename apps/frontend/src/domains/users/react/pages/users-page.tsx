import { useEffect } from "react";
import { useUsersStore } from "@/domains/users/users-store";
import Layout from "@/ui/layouts/layout";
import CreateUserForm from "../components/create-user-form";
import UserList from "../components/user-list";

export default function UsersPage() {
  const { fetchUsers, loading, error } = useUsersStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Layout>
      <div className="mx-auto max-w-3xl p-4">
        <h1 className="mb-6 text-2xl font-bold">Users</h1>

        <CreateUserForm />

        {loading && <p className="text-blue-700">Loading users...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && <UserList />}
      </div>
    </Layout>
  );
}
