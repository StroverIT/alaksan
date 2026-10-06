import SessionProvider from "@/components/SessionProvider";
import type { FC, ReactNode } from "react";

type TAdminLayoutProps = {
  children: ReactNode;
};

const AdminLayout: FC<TAdminLayoutProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AdminLayout;
