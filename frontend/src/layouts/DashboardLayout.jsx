// src/layouts/DashboardLayout.jsx
import Sidebar from "../components/SideBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-gray-900 dark:text-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
