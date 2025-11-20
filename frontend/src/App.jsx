import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ConditionsDashboard from "./pages/ConditionsDashboard";
import HealthLogsDashboard from "./pages/HealthLogsDashboard";
import MainDashboard from "./pages/MainDashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import Footer from "./components/Footer";
import { MdMonitorHeart } from "react-icons/md";
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
            <h1 className="text-2xl font-bold">LifeTrack</h1>
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <div
                onClick={toggleTheme}
                className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                  darkMode ? "bg-gray-700" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                    darkMode ? "translate-x-7" : ""
                  }`}
                />
              </div>

              {/* Sign-in / User button */}
              <SignedOut>
                <SignInButton
                  mode="modal"
                  className={`cursor-pointer px-4 py-2 rounded ${
                    darkMode
                      ? "bg-green-700 text-white hover:bg-green-800"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                />
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow relative overflow-hidden">
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
                      <MainDashboard frontendUserId={user.id} />
                    </div>
                  </DashboardLayout>
                }
              />

              <Route
                path="/add-condition"
                element={
                  <DashboardLayout>
                    <ConditionsDashboard />
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
            // Signed-out welcome page with animated background
            <div
              className={`min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 relative overflow-hidden ${
                darkMode
                  ? "bg-gray-900 text-gray-100"
                  : "bg-slate-50 text-gray-900"
              }`}
            >
              {/* Animated background blobs */}
              <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute w-80 h-80 bg-purple-400 opacity-30 rounded-full -top-24 -left-24 blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute w-96 h-96 bg-indigo-500 opacity-25 rounded-full -bottom-32 -right-32 blur-3xl animate-blob animation-delay-4000"></div>
                <div className="absolute w-72 h-72 bg-pink-400 opacity-20 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-2xl animate-blob animation-delay-6000"></div>
              </div>

              {/* Elevated card */}
              <div
                className={`max-w-md w-full text-center relative z-10 p-8 rounded-2xl border ${
                  darkMode
                    ? "bg-gray-800 border-gray-600 shadow-2xl"
                    : "bg-white border-gray-200 shadow-2xl"
                }`}
              >
                <div className="flex gap-4 items-center align-center justify-center">
                  <MdMonitorHeart className="text-red-500 w-10 h-10" />
                  <h1 className="sm:text-3xl font-bold-medium text-red-600">
                    LifeTrack
                  </h1>
                </div>

                <h2 className="text-xl sm:text-3xl font-semibold mt-4">
                  Welcome back! Sign in to track your health, link logs to
                  conditions, and gain actionable insights.
                </h2>
                <p
                  className={`text-lg mt-4 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } leading-relaxed`}
                >
                  Track Today, Thrive Tomorrow!!!
                </p>
                <SignInButton
                  mode="modal"
                  className={`mt-6 w-full py-4 rounded-4xl font-semibold text-lg transition-transform duration-300 transform hover:scale-105 ${
                    darkMode
                      ? "bg-green-700 text-white hover:bg-green-800"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  Track My Health
                </SignInButton>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
