import CartProvider from "@/components/CartProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { FC, ReactNode } from "react";

type TSiteLayoutProps = {
  children: ReactNode;
};

const SiteLayout: FC<TSiteLayoutProps> = ({ children }) => {
  return (
    <CartProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </CartProvider>
  );
};

export default SiteLayout;
