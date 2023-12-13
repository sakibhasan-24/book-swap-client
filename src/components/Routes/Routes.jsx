import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePages from "../Pages/HomePages";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import About from "../Pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/", element: <HomePages /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/about", element: <About /> },
    ],
  },
]);

export default router;
