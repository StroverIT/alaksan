import CartProvider from "@/components/CartProvider";
import Footer from "@/components/Footer";
import GoogleTagManager from "@/components/GoogleTagManager";
import Header from "@/components/Header";
import { CONTENT } from "@/consts";
import type { FC, ReactNode } from "react";

type TSiteLayoutProps = {
  children: ReactNode;
};

const SiteLayout: FC<TSiteLayoutProps> = ({ children }) => {
  return (
    <CartProvider>
      <GoogleTagManager />
      <a
        href="#site-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        {CONTENT.skipToContentLabel}
      </a>
      <Header />
      <main id="site-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </CartProvider>
  );
};

export default SiteLayout;
