import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      {children}
    </div>
  );
}
