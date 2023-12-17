import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ bookInfo }) {
  //   console.log(bookInfo.owner);
  const [user, setuser] = useState(null);
  const [message, setMessage] = useState("");
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  console.log(`http://localhost:5000/user/${bookInfo?.owner}`);
  useEffect(() => {
    const loadUser = async () => {
      fetch(`http://localhost:5000/user/${bookInfo?.owner}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setuser(data.userData);
        });
    };
    loadUser();
  }, [bookInfo.owner]);

  return (
    <div className="my-8 p-4 ">
      <h1 className="text-center font-semibold text-slate-900">
        Contact with{" "}
        <Link to="https://mail.google.com/mail/u/0/#inbox">
          <span className="text-blue-400 mx-2">{user?.email}</span>
        </Link>{" "}
        for{" "}
        <span className="text-2xl font-bold text-blue-800  ">
          {bookInfo.title}{" "}
        </span>
        book{" "}
      </h1>
      <textarea
        name=""
        id="message"
        cols="30"
        placeholder="write here your message"
        rows="4"
        value={message}
        onChange={handleMessage}
        className="w-full border-2 border-gray-300 p-4 rounded-md bg-slate-200 focus:outline-none"
      ></textarea>
      <Link
        to={`mailto:${user?.email}?subject=i need ${bookInfo?.title}&body=${message}`}
      >
        <button className="bg-slate-600 text-white p-4 rounded-lg">
          Send message
        </button>
      </Link>
    </div>
  );
}
