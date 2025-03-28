import { useUsersStore } from "@/domains/users/users-store";

export default function UserList() {
  const { users } = useUsersStore();

  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li key={user.id} className="rounded border p-3">
          <strong>{user.name}</strong> — {user.id}
        </li>
      ))}
    </ul>
  );
}
