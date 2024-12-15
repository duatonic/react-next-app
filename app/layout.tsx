import type { Metadata } from "next";
import localFont from "next/font/local";
import "./ui/globals.css";
import Sidebar from "./ui/sidebar/sidebar";
import FollowBar from "./ui/sidebar/followbar";
import LoginModal from "./ui/modal/login-modal";
import RegisterModal from "./ui/modal/register-modal";
// import Modal from "./ui/modal/modal";

export const metadata: Metadata = {
  title: "Chirper",
  description: "Chirper social media app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen bg-black">
        {/* <Modal actionLabel="Submit" isOpen title="test modal" /> */}
        <LoginModal />
        <RegisterModal />
        <div className="container h-full mx-auto xl:px-30 max-w-6xl">
          <div className="grid grid-cols-4 h-full">
            <Sidebar />
            <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
              {children}
            </div>
            <FollowBar />
          </div>
        </div>
      </body>
    </html>
  );
}
