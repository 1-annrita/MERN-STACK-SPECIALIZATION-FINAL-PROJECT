// src/components/Sidebar.jsx
import { SignedIn } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";
import { Home, PlusCircle, NotebookPen, BarChart } from "lucide-react";

export default function Sidebar() {
  return (
    <SignedIn>
      <aside className="w-64 bg-white border-r h-screen p-4 hidden md:block">
        <h2 className="text-xl font-semibold mb-6">Menu</h2>
        <nav className="space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md hover:bg-slate-100 
               ${isActive ? "bg-slate-200 font-semibold" : "text-slate-700"}`
            }
          >
            <Home className="w-5 h-5" />
            Dashboard
          </NavLink>

          <NavLink
            to="/add-condition"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md hover:bg-slate-100 
               ${isActive ? "bg-slate-200 font-semibold" : "text-slate-700"}`
            }
          >
            <PlusCircle className="w-5 h-5" />
            Add Condition
          </NavLink>

          <NavLink
            to="/logs"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md hover:bg-slate-100 
               ${isActive ? "bg-slate-200 font-semibold" : "text-slate-700"}`
            }
          >
            <NotebookPen className="w-5 h-5" />
            Health Logs
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md hover:bg-slate-100 
               ${isActive ? "bg-slate-200 font-semibold" : "text-slate-700"}`
            }
          >
            <BarChart className="w-5 h-5" />
            Reports
          </NavLink>
        </nav>
      </aside>
    </SignedIn>
  );
}
