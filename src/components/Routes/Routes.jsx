import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePages from "../Pages/HomePages";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import About from "../Pages/About";
import Profile from "../Pages/Profile";
import Protected from "./Protected";
import CreateBooks from "../Pages/CreateBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/", element: <HomePages /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/about", element: <About /> },
      {
        path: "/profile",
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
      },
      {
        path: "/books/create",
        element: (
          <Protected>
            <CreateBooks />
          </Protected>
        ),
      },
    ],
  },
]);

export default router;
