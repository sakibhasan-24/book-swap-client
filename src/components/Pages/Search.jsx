import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      {/* left */}
      <div className="p-8 border-b-2 md:border-r-2 min-h-screen">
        <form>
          <div className="flex items-center gap-4 ">
            <label className="text-slate-600 whitespace-nowrap">search</label>
            <input
              type="text"
              name=""
              id="searchText"
              placeholder="search"
              className="border rounded-lg p-4 w-full"
            />
          </div>
          <div className="flex items-center flex-nowrap gap-4 my-6">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="borrow" />
              <span className="text-slate-700 font-bold">borrow</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="fixedPrice" />
              <span className="text-slate-700 font-bold">fixed Price</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="sell" />
              <span className="text-slate-700 font-bold">Sell</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label>filter</label>
            <select
              name=""
              id="sort_order"
              className="border rounded-lg p-4 w-full focus:outline-none"
            >
              <option value="">price from high</option>
              <option value="">price from low</option>
              <option value="">latest</option>
              <option value="">oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-lg font-bold uppercase px-4 py-2 my-2 w-full rounded-lg">
            get result{" "}
          </button>
        </form>
      </div>
      {/* right */}
      <div>
        <h1>Result</h1>
      </div>
    </div>
  );
}
