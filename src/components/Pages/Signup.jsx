import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="p-4">
      <h1 className="text-center text-3xl font-bold text-slate-600 mt-6">
        Sign Up
      </h1>
      <form className="flex gap-6 flex-col p-4 max-w-2xl mx-auto">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="name"
          className="rounded-lg p-3 bg-slate-200 focus:outline-none"
        />
        <input
          type="text"
          name="email"
          id="email"
          placeholder="email"
          className="rounded-lg p-3 bg-slate-200 focus:outline-none"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          className="rounded-lg p-3 bg-slate-200 focus:outline-none"
        />
        <button className="bg-slate-800 text-white px-4 py-3 rounded-lg font-bold uppercase disabled:bg-slate-600">
          Sign Up
        </button>
      </form>
      <p className="text-center font-semibold text-xl">
        Have an account?
        <Link className="text-blue-500 ml-4" to="/login">
          login
        </Link>
      </p>
    </div>
  );
}
