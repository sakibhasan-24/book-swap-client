import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Books() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [bookInfo, setBookInfo] = useState(null);

  useEffect(() => {
    const getSingleBookInfo = () => {
      setLoading(false);
      fetch(`http://localhost:5000/books/getSingleBook/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            setLoading(false);
            setBookInfo(data.book);
          }
          if (data.success === false) {
            setLoading(true);
          }
        });
    };
    getSingleBookInfo();
  }, [id]);
  console.log(bookInfo);
  //   load images for banner
  // load all information for details

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid  grid-cols-1 sm:grid-cols-4 gap-4 rounded-lg my-8 max-w-lg  sm:max-w-4xl mx-auto">
        {bookInfo?.imageUrls.map((image, idx) => (
          <div key={idx} className="">
            <img src={image} alt="images" className="w-full " />
          </div>
        ))}
      </div>
      <div className="border-2 shadow-2xl px-2 py-4 mx-auto text-center my-6 p-4">
        <h1 className="text-2xl font-bold text-slate-700">
          Title:{bookInfo?.title}
        </h1>
        <p className="text-xl font bold">Author:{bookInfo?.author}</p>
        <p className="text-xl font bold">Description:{bookInfo?.description}</p>
        <p className="text-slate-700 font-semibold">
          Books Conditions:{" "}
          <span className="text-blue-600 font-semibold text-2xl">
            {" "}
            {bookInfo?.conditions}{" "}
          </span>
        </p>
        <p className="text-green-600 font-semibold">price:${bookInfo?.price}</p>
        {bookInfo?.borrow ? (
          <p className="bg-blue-900 text-white font rounded-md px-2 py-1">
            borrow available
          </p>
        ) : (
          ""
        )}
        {bookInfo?.fixed ? (
          <p className="text-white font-semibold bg-blue-950  rounded-lg py-2 px-4">
            price is not fixed
          </p>
        ) : (
          <p className="text-white font-semibold bg-blue-950 rounded-lg py-2 px-4 ">
            price is fixed
          </p>
        )}
        {bookInfo?.sell ? (
          <p className="text-slate-700 font-semibold bg-green-400 rounded-md px-2 py-1">
            sell available
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
