// src/layouts/DashboardLayout.jsx
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar /> {/* Sidebar always visible for signed-in users */}

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
