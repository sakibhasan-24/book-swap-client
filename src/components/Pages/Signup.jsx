import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../GoogleAuth";

export default function Signup() {
  const navigate = useNavigate();
  const [signUpFormData, setSignUpFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSignUpValue = (e) => {
    // console.log([e.target.name, e.target.value]);
    setSignUpFormData({ ...signUpFormData, [e.target.name]: e.target.value });
  };
  //   console.log(signUpFormData);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setLoading(true);

    // https://book-swap-eight.vercel.app//signup
    // fetch("https://book-swap-gkpe.onrender.com/signup",
    fetch;
    fetch("https://book-swap-eight.vercel.app/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success === true) {
          setLoading(false);
          setError(null);
          navigate("/");
        }
        if (data.success === false) {
          setLoading(false);
          setError(data.errorMessage);
          //   console.log("data.message", data.errorMessage);
          return;
        }
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
      });
  };
  //   console.log(error);
  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-center text-3xl font-bold text-slate-600 mt-6">
        Sign Up
      </h1>
      <form onSubmit={handleSubmitForm} className="flex gap-6 flex-col p-4 ">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="name"
          onChange={handleSignUpValue}
          className="rounded-lg p-3 bg-slate-200 focus:outline-none"
        />
        <input
          type="text"
          name="email"
          id="email"
          placeholder="email"
          onChange={handleSignUpValue}
          className="rounded-lg p-3 bg-slate-200 focus:outline-none"
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleSignUpValue}
          placeholder="password"
          className="rounded-lg p-3 bg-slate-200 focus:outline-none"
        />
        <button
          disabled={loading}
          className="bg-slate-800 text-white px-4 py-3 rounded-lg font-bold uppercase disabled:bg-slate-600"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <GoogleAuth />
      </form>
      <p className="text-center font-semibold text-xl">
        Have an account?
        <Link className="text-blue-500 ml-4" to="/login">
          login
        </Link>
      </p>
      <p className="text-red-500 font-semibold text-center text-xs">
        {error && error}
      </p>
    </div>
  );
}
