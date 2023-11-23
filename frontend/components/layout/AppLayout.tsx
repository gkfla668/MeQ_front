import React from "react";
import Header from "./Header";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className={`flex flex-col items-center w-full p-10`}>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
