// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import Footer from "./components/Footer";

export default function App() {
    const { user } = useUser();
  return (
     <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b">
        <div className="mx-auto max-w-5xl p-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Chronic Conditions Monitoring App</h1>
            {/* <p className="text-slate-600 text-sm">Express + MongoDB backend • React + Tailwind + Radix front-end • axios• clerk </p> */}
          </div>
          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton mode="modal" className="cursor-pointer" />
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/"/>
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="py-6 flex-grow">
        <div className="mx-auto max-w-5xl">
          <SignedOut>
            <div className="border rounded-xl bg-white p-6 text-center">
              <h2 className="text-lg font-semibold mb-2">Welcome to our Chronic Conditions Monitoring App</h2>
              <p className="text-slate-600">Please sign in to use our app</p>
            </div>
          </SignedOut>

          <SignedIn>
            <Dashboard frontendUserId={user?.id} />
          </SignedIn>
        </div>
      </main>

      <footer className="bg-white border-t mt-auto">
            <Footer />
      </footer>
    </div>
  );
}


