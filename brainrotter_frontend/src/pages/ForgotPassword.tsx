import React, { useState } from "react";
import API_URL from "../config/api";
import { Link } from "react-router-dom";
import skull from "../assets/skull.png";
import { useBrainrot } from "../contexts/BrainrotContext";

const ForgotPassword: React.FC = () => {
  const { isBrainrot } = useBrainrot();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMsg(data.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-lg">
          <div className="flex justify-center items-center mb-8 space-x-4">
            <img src={skull} alt="skull" className="w-12 h-12" />
            <h2 className="text-3xl font-bold text-center text-white">
              {isBrainrot ? "Forgot ur password goofy?" : "Forgot Password"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Enter your email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-neon-purple text-black font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
            >
              Send Reset Link
            </button>
          </form>

          {msg && (
            <p className="text-center text-neon-purple mt-4 font-semibold">
              {msg}
            </p>
          )}

          <p className="mt-6 text-center text-sm text-gray-400">
            Back to{" "}
            <Link to="/login" className="text-neon-purple font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
