import React from "react";
import { Link } from "react-router-dom";

export default function SearchBook({ book }) {
  return (
    <div className="bg-slate-100 shadow-lg rounded-lg w-full sm:w-[250px] my-4">
      <Link to={`/books/${book._id}`}>
        <img
          src={book.imageUrls[0]}
          alt="image "
          className="h-[320px] sm:h-[220px] object-cover w-full"
        />
        .
        <div className="p-3 font-bold text-slate-800 ">
          <p className="truncate">{book.title}</p>
          <p className="truncate">address:{book.address}</p>
          <p className="font-semibold truncate">
            description: <span className="text-xs">{book.description}</span>
          </p>
          <p>{book.price}tk</p>
        </div>
      </Link>
    </div>
  );
}
