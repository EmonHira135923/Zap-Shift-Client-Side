import React, { useState } from "react";
import { Outlet } from "react-router";
import Aside from "../Componets/Dashboard/Share/Aside";
import Anavvar from "../Componets/Dashboard/Share/Anavvar";

const DashboardLayout = () => {
  const [openAside, setOpenAside] = useState(true);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-full z-30 transition-all duration-300 ease-in-out
          ${openAside ? "w-64" : "w-20"}
          bg-gray-900/95 backdrop-blur-xl border-r border-gray-800/50
          shadow-2xl shadow-black/30
        `}
      >
        <Aside openAside={openAside} />
      </aside>

      {/* Main Content Area */}
      <main
        className={`
          flex-1 flex flex-col transition-all duration-300 ease-in-out
          ${openAside ? "ml-64" : "ml-20"}
        `}
      >
        {/* Navbar */}
        <header className="sticky top-0 z-20">
          <div className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50">
            <Anavvar toggleAside={() => setOpenAside(!openAside)} />
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="max-w-full mx-auto">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Overlay for mobile (optional) */}
      {!openAside && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => setOpenAside(true)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
