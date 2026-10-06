import AdminLoginForm from "@/components/AdminLoginForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { FC } from "react";

const AdminLoginPage: FC = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/admin/dostavki");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12 text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-5%,rgba(193,122,58,0.16),transparent_55%),radial-gradient(circle_at_90%_85%,rgba(27,58,75,0.08),transparent_40%)]"
      />
      <div className="relative z-10 w-full max-w-md">
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default AdminLoginPage;
