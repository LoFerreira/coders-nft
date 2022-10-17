import { ReactNode } from "react";
import Footer from "./_footer";
import Navbar from "./_navbar";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-[#1d1f2b]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
