import { useState } from "react";
import { useUsersStore } from "@/domains/users/users-store";

export default function CreateUserForm() {
  const [name, setName] = useState("");
  const { createUser } = useUsersStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await createUser(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        placeholder="Enter user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded px-3 py-1 mr-2"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
        Create User
      </button>
    </form>
  );
}
