import { SignedIn } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";
import { Home, PlusCircle, NotebookPen, BarChart } from "lucide-react";

export default function Sidebar() {
  return (
    <SignedIn>
      <aside
        className="
          w-64 
          bg-white dark:bg-gray-900 
          border-r dark:border-gray-700 
          h-screen p-4 hidden md:block
          text-gray-900 dark:text-gray-100
        "
      >
        <h2 className="text-xl font-semibold mb-6">Menu</h2>

        <nav className="space-y-2">

          {/* Dashboard */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md
              hover:bg-gray-100 dark:hover:bg-gray-800
              ${
                isActive
                  ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`
            }
          >
            <Home className="w-5 h-5" />
            Dashboard
          </NavLink>

          {/* Add Condition */}
          <NavLink
            to="/add-condition"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md
              hover:bg-gray-100 dark:hover:bg-gray-800
              ${
                isActive
                  ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`
            }
          >
            <PlusCircle className="w-5 h-5" />
            Add Condition
          </NavLink>

          {/* Logs */}
          <NavLink
            to="/logs"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md
              hover:bg-gray-100 dark:hover:bg-gray-800
              ${
                isActive
                  ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`
            }
          >
            <NotebookPen className="w-5 h-5" />
            Health Logs
          </NavLink>

          {/* Reports */}
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md
              hover:bg-gray-100 dark:hover:bg-gray-800
              ${
                isActive
                  ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`
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
