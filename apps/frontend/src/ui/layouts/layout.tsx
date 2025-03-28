import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="text-gray-900 min-h-screen">
      <main className="py-6">{children}</main>
      <footer className="bg-gray-100 p-4 text-center">©2025 My App</footer>
    </div>
  );
}
