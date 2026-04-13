/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";

// 🔐 Our Mock Database of 3 Students
const MOCK_USERS = [
  { roll: "202401100200100", password: "Gagan@123", name: "Gagan Tripathi" },
  { roll: "202401100200101", password: "Aditi@123", name: "Aditi Sharma" },
  { roll: "202401100200102", password: "Rahul@123", name: "Rahul Kumar" }
];

export default function LoginPage({ setUser }) {
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!roll || !password) {
      toast.error("Please enter both Roll Number and Password!");
      return;
    }

    const foundUser = MOCK_USERS.find(
      (u) => u.roll === roll && u.password === password
    );

    if (foundUser) {
      setUser({ name: foundUser.name, roll: foundUser.roll });
      toast.success(`Welcome back, ${foundUser.name.split(' ')[0]}! 🎉`);
    } else {
      toast.error("Invalid Roll Number or Password! 🚫");
    }
  };

  return (
    // 🌟 Added "fixed inset-0 z-50" so it breaks out of the container and covers the whole screen!
    <div 
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center bg-no-repeat z-50 overflow-y-auto"
      style={{ backgroundImage: "url('/login-bg.jpeg')" }} 
    >
      {/* 🌑 Overlay */}
      <div className="absolute inset-0 bg-slate-900/30 fixed"></div>

      {/* 🪟 The Login Card */}
      <div className="relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 dark:border-slate-700/50 m-4">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white mb-4 shadow-lg shadow-indigo-500/30">
            <span className="text-2xl">🎟️</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">KIET Events</h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Secure student portal</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Roll Number</label>
            <input 
              type="text" 
              placeholder="e.g. 202401100200100"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
            />
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white p-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none hover:-translate-y-0.5 mt-2">
            Login to Dashboard
          </button>
        </form>

        {/* Test Accounts Info */}
        <div className="mt-8 p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl text-xs text-slate-600 dark:text-slate-400 text-center border border-slate-200/50 dark:border-slate-700/50">
          <p className="font-bold mb-1 text-slate-800 dark:text-slate-200">Test Accounts:</p>
          <p>Roll: 202401100200100 | Pass: Gagan@123</p>
          <p>Roll: 202401100200101 | Pass: Aditi@123</p>
        </div>

      </div>
    </div>
  );
}