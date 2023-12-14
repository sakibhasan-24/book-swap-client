import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../redux/user";
import GoogleAuth from "../GoogleAuth";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signInFormData, setSignUpFormData] = useState({});
  //   old
  /* const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); */
  //   smart redux
  const { loading, error } = useSelector((state) => state.user);
  const handleSignUpValue = (e) => {
    // console.log([e.target.name, e.target.value]);
    setSignUpFormData({ ...signInFormData, [e.target.name]: e.target.value });
  };
  //   console.log(signUpFormData);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    // setLoading(true);
    dispatch(signInStart(true));

    fetch("http://localhost:5000/signup/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success === true) {
          //   setLoading(false);
          //   setError(null);
          dispatch(signInFailure(null));
          dispatch(signInSuccess(data));
          navigate("/");
        }
        if (data.success === false) {
          //   setLoading(false);
          //   setError(data.errorMessage);
          dispatch(signInFailure(data.errorMessage));

          //   console.log("data.message", data.errorMessage);
          return;
        }
      })
      .catch((e) => {
        // setLoading(false);
        // setError(e.message);
        dispatch(signInFailure(e.message));
      });
  };
  //   console.log(error);
  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-center text-3xl font-bold text-slate-600 mt-6">
        Login
      </h1>
      <form onSubmit={handleSubmitForm} className="flex gap-6 flex-col p-4 ">
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
        don't Have an account?
        <Link className="text-blue-500 ml-4" to="/signup">
          Sign up
        </Link>
      </p>
      <p className="text-red-500 font-semibold text-center text-xs">
        {error && error}
      </p>
    </div>
  );
}
