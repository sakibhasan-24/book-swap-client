import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState({
    searchText: "",
    borrow: false,
    sell: true,
    fixedPrice: false,
    sort: "created_at",
    order: "desc",
  });
  const navigate = useNavigate();
  const handleSearchValue = (e) => {
    if (e.target.id === "searchText") {
      setSearchData({ ...searchData, searchText: e.target.value });
    }
    if (
      e.target.id === "borrow" ||
      e.target.id === "sell" ||
      e.target.id === "fixedPrice"
    ) {
      setSearchData({
        ...searchData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      //   console.log("sort", sort);
      const order = e.target.value.split("_")[1] || "desc";
      //   console.log("order", order);
      setSearchData({
        ...searchData,
        sort: sort,
        order: order,
      });
    }
  };

  const handleSubmitSearchData = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    // console.log(urlParams);
    urlParams.set("searchText", searchData.searchText);
    urlParams.set("borrow", searchData.borrow);
    urlParams.set("sell", searchData.sell);
    urlParams.set("fixedPrice", searchData.fixedPrice);
    urlParams.set("sort", searchData.sort);
    urlParams.set("order", searchData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    // console.log(searchQuery);
  };
  useEffect(() => {
    setLoading(true);
    const urlParams = new URLSearchParams(location.search);
    const search = urlParams.get("searchText");
    const borrow = urlParams.get("borrow");
    const sell = urlParams.get("sell");
    const fixedPrice = urlParams.get("fixedPrice");
    const order = urlParams.get("order");
    const sort = urlParams.get("sort");
    if (search || borrow || sell || fixedPrice || order || sort) {
      setSearchData({
        searchText: search || "",
        borrow: borrow === "true" ? true : false,
        sell: sell === "true" ? true : false,
        fixedPrice: fixedPrice === "true" ? true : false,
        order: order || "created_at",
        sort: sort || "desc",
      });
    }
    const laodSearchResult = async () => {
      const searchQuery = urlParams.toString();
      try {
        fetch(`http://localhost:5000/books/getAllBooks?${searchQuery}`, {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success === true) {
              setSearchResult(data.books);
              setLoading(false);
            }
          });
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    };
    laodSearchResult();
  }, [location.search]);

  return (
    <div className="flex flex-col md:flex-row">
      {/* left */}
      <div className="p-8 border-b-2 md:border-r-2 min-h-screen">
        <form onSubmit={handleSubmitSearchData}>
          <div className="flex items-center gap-4 ">
            <label className="text-slate-600 whitespace-nowrap">search</label>
            <input
              type="text"
              name=""
              id="searchText"
              placeholder="search"
              className="border rounded-lg p-4 w-full"
              onChange={handleSearchValue}
              value={searchData.searchText}
            />
          </div>
          <div className="flex items-center flex-nowrap gap-4 my-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="borrow"
                checked={searchData.borrow}
                onChange={handleSearchValue}
              />
              <span className="text-slate-700 font-bold">borrow</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="fixedPrice"
                checked={searchData.fixedPrice}
                onChange={handleSearchValue}
              />
              <span className="text-slate-700 font-bold">fixedPrice</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sell"
                checked={searchData.sell}
                onChange={handleSearchValue}
              />
              <span className="text-slate-700 font-bold">Sell</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label>filter</label>
            <select
              name=""
              id="sort_order"
              onChange={handleSearchValue}
              defaultValue={`created_desc`}
              className="border rounded-lg p-4 w-full focus:outline-none"
            >
              <option value="price_desc">price from high</option>
              <option value="price_asc">price from low</option>
              <option value="created_desc">latest</option>
              <option value="created_asc">oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-lg font-bold uppercase px-4 py-2 my-2 w-full rounded-lg">
            get result{" "}
          </button>
        </form>
      </div>
      {/* right */}
      <div>
        {/* <h1>Result {searchResult.length}</h1> */}
        {}
      </div>
    </div>
  );
}
