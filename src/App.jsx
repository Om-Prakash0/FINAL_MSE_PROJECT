import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import EventPage from "./pages/EventPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import MyRegistrationPage from "./pages/MyRegistrationPage";

export default function App() {
  // App State (Replacing localStorage)
  const [user, setUser] = useState(null); // null means not logged in
  const [registeredEvents, setRegisteredEvents] = useState([]); // array of event IDs

  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        {/* Only show Navbar if user is logged in */}
        {user && <Navbar user={user} setUser={setUser} />}

        <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8">
          <Routes>
            {/* Login Route */}
            <Route 
              path="/login" 
              element={!user ? <LoginPage setUser={setUser} /> : <Navigate to="/" />} 
            />
            
            {/* Protected Routes (Only accessible if 'user' exists) */}
            <Route 
              path="/" 
              element={user ? <EventPage /> : <Navigate to="/login" />} 
            />
            
            <Route 
              path="/events/:id" 
              element={
                user ? (
                  <EventDetailsPage 
                    registeredEvents={registeredEvents} 
                    setRegisteredEvents={setRegisteredEvents} 
                  />
                ) : <Navigate to="/login" />
              } 
            />
            
            <Route 
              path="/my-registrations" 
              element={
                user ? (
                  <MyRegistrationPage 
                    user={user} 
                    registeredEvents={registeredEvents} 
                    setRegisteredEvents={setRegisteredEvents} 
                  />
                ) : <Navigate to="/login" />
              } 
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}