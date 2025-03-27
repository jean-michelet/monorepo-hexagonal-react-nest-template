import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="py-6">{children}</main>
      <footer className="p-4 bg-gray-100 text-center">©2025 My App</footer>
    </div>
  );
}
