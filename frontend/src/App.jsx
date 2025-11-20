import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ConditionsDashboard from "./pages/ConditionsDashboard";
import HealthLogsDashboard from "./pages/HealthLogsDashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import Footer from "./components/Footer";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

export default function App() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null; // Wait for Clerk to load

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50">

        {/* Header */}
        <header className="bg-white border-b">
          <div className="mx-auto max-w-5xl p-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Chronic Conditions Monitoring App</h1>
            <div className="flex items-center gap-3">
              <SignedOut>
                <SignInButton mode="modal" className="cursor-pointer" />
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-grow">
          {user ? (
            // Routes for signed-in users
            <Routes>
              {/* Redirect root to dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* Dashboard */}
              <Route
                path="/dashboard"
                element={
                  <DashboardLayout>
                    <div className="p-4">Dashboard page coming soon</div>
                  </DashboardLayout>
                }
              />

              {/* Add Condition */}
              <Route
                path="/add-condition"
                element={
                  <DashboardLayout>
                    <ConditionsDashboard frontendUserId={user.id} />
                  </DashboardLayout>
                }
              />

              {/* Logs */}
              <Route
                path="/logs"
                element={
                  <DashboardLayout>
                     <HealthLogsDashboard />
                  </DashboardLayout>
                }
              />

              {/* Reports */}
              <Route
                path="/reports"
                element={
                  <DashboardLayout>
                    <div className="p-4">Reports coming soon</div>
                  </DashboardLayout>
                }
              />
            </Routes>
          ) : (
            // Signed-out welcome page
            <div className="max-w-md mx-auto border rounded-xl bg-white p-6 text-center shadow-md mt-10">
              <h2 className="text-lg font-semibold mb-2">Welcome</h2>
              <p className="text-slate-600">Please sign in to use our app</p>
              <SignInButton
                mode="modal"
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Sign In
              </SignInButton>
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
