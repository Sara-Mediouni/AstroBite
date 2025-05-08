import React from "react";
import { Home, NotepadText, Play } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 shadow h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-yellow-500">astrobite</h1>
        <nav className="space-y-8 text-yellow-500 ">
          <a href="/" className="flex items-center p-2 text-yellow-500 rounded">
            <Home className="w-5 h-5 mr-2" /> Dashboard
          </a>
          <a
            href="/food"
            className="flex items-center p-2 text-yellow-500 rounded"
          >
            <Play className="w-5 h-5 mr-2" /> Food
          </a>

          <a
            href="/orders"
            className="flex items-center p-2 text-yellow-500 rounded"
          >
            <NotepadText className="w-5 h-5 mr-2" /> Orders
          </a>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
