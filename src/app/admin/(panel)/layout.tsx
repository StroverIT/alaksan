import AdminAside from "@/components/AdminAside";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { FC, ReactNode } from "react";

type TPanelLayoutProps = {
  children: ReactNode;
};

const PanelLayout: FC<TPanelLayoutProps> = async ({ children }) => {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen flex-col md:flex-row">
        <AdminAside />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default PanelLayout;
