import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePages() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://book-swap-eight.vercel.app/books/getAllBooks")
      .then((res) => res.json())
      .then((data) => setBooks(data.books));
  }, []);
  // console.log(books);
  return (
    <div>
      {/* top */}
      <div className="px-4 py-32 max-w-4xl mx-auto flex flex-col md:flex-col lg:flex-row gap-6 items-center justify-center">
        <div>
          <h1 className="text-6xl font-bold">
            we <span className="text-orange-700 font-semibold">swap</span> our
            books <br /> with you{" "}
          </h1>
          <p className="text-2xl font-semibold my-12">
            This will help you to buy old and previous books <br />
            <span className="text-slate-500">with low cost easily</span>{" "}
          </p>
        </div>
        <div>
          <img
            src="https://www.tridentbookscafe.com/sites/tridentbookscafe.com/files/Book%20Swap.jpg"
            alt="home image"
            className="rounded-lg"
          />
        </div>
      </div>
      {/* data */}
      <section className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">Our Books</h1>
        <Link
          to="/search"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold"
        >
          explore more
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-12">
          {books.map((book) => {
            return (
              <div key={book._id} className="p-4 border-2 ">
                <Link
                  to={`/books/${book._id}`}
                  className=" rounded-lg shadow-md "
                >
                  <img
                    src={book.imageUrls[0]}
                    alt="img"
                    className="w-full rounded-lg p-6"
                  />
                  <h1 className="text-xl font-bold text-center">
                    {book.title}
                  </h1>
                  <p className="text-center font-bold text-green-700">
                    ${book.price}bdt
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
