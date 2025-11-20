import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ConditionsDashboard from "./pages/ConditionsDashboard";
import HealthLogsDashboard from "./pages/HealthLogsDashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import Footer from "./components/Footer";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useContext } from "react";
import { ThemeContext } from "./context/Theme";

export default function App() {
  const { user, isLoaded } = useUser();
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  if (!isLoaded) return null; // Wait for Clerk to load

  return (
    <BrowserRouter>
      <div
        className={`min-h-screen flex flex-col ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-slate-50 text-gray-900"
        }`}
      >
        {/* Header */}
        <header
          className={`border-b ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-b"
          }`}
        >
          <div className="mx-auto max-w-5xl p-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              Chronic Conditions Monitoring App
            </h1>
            <div className="flex items-center gap-3">
              <div
                onClick={toggleTheme}
                className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 
    ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 
      ${darkMode ? "translate-x-7" : ""}`}
                />
              </div>

              <SignedOut>
                <SignInButton
                  mode="modal"
                  className={`cursor-pointer px-4 py-2 rounded ${
                    darkMode
                      ? "bg-blue-700 text-white hover:bg-blue-800"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                />
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
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              <Route
                path="/dashboard"
                element={
                  <DashboardLayout>
                    <div
                      className={`p-4 rounded shadow ${
                        darkMode ? "bg-gray-800 text-gray-100" : "bg-white"
                      }`}
                    >
                      Dashboard page coming soon ...
                    </div>
                  </DashboardLayout>
                }
              />

              <Route
                path="/add-condition"
                element={
                  <DashboardLayout>
                    <ConditionsDashboard frontendUserId={user.id} />
                  </DashboardLayout>
                }
              />

              <Route
                path="/logs"
                element={
                  <DashboardLayout>
                    <HealthLogsDashboard />
                  </DashboardLayout>
                }
              />

              <Route
                path="/reports"
                element={
                  <DashboardLayout>
                    <div
                      className={`p-4 rounded shadow ${
                        darkMode ? "bg-gray-800 text-gray-100" : "bg-white"
                      }`}
                    >
                      Reports coming soon ...
                    </div>
                  </DashboardLayout>
                }
              />
            </Routes>
          ) : (
            <div
              className={`max-w-md mx-auto border rounded-xl p-6 text-center shadow-md mt-10 ${
                darkMode
                  ? "bg-gray-800 text-gray-100 border-gray-700"
                  : "bg-white text-gray-900"
              }`}
            >
              <h2 className="text-lg font-semibold mb-2">Welcome</h2>
              <p className={darkMode ? "text-gray-300" : "text-slate-600"}>
                Please sign in to use our app
              </p>
              <SignInButton
                mode="modal"
                className={`mt-4 inline-block px-4 py-2 rounded ${
                  darkMode
                    ? "bg-blue-700 text-white hover:bg-blue-800"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
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
