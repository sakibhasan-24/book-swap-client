import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { signOutFailure, signOutStart, signOutSuccess } from "../redux/user";
import { useEffect, useState } from "react";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  //   console.log(currentUser.user.photo);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchUrl = new URLSearchParams(window.location.search);
    // console.log(searchUrl);
    searchUrl.set("searchText", searchText);
    const searchQuery = searchUrl.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const searchUrl = new URLSearchParams(location.search);
    const searchQuery = searchUrl.get("searchText");
    if (searchQuery) {
      setSearchText(searchQuery);
    }
  }, [location.search]);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    try {
      dispatch(signOutStart(true));
      fetch(`http://localhost:5000/signout`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success === true) {
            dispatch(signOutSuccess(data));
            navigate("/login");
            return;
          }
          if (data.success === false) {
            dispatch(signOutFailure(data));
          }
        });
    } catch (error) {
      dispatch(signOutFailure(error));
    }
  };
  return (
    <header className="bg-slate-300 shadow-lg">
      <div className="flex justify-between items-center  p-4 max-w-6xl mx-auto">
        <h1 className="text-xs sm:text-xl font-bold flex flex-wrap">
          <Link to="/">
            Book <span className="text-orange-700">Swap</span>
          </Link>
        </h1>
        <form
          onSubmit={handleSearch}
          className="bg-slate-100 rounded-lg flex items-center p-3"
        >
          <input
            className="  bg-transparent rounded-lg focus:outline-none focus:shadow-none w-24 sm:w-64 "
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleSearchText}
          />
          <button type="button">
            <CiSearch />
          </button>
        </form>
        <div className="flex items-center space-x-4">
          <Link
            to="/about"
            className="hidden sm:inline-block text-sm sm:text-xl font-bold hover:underline"
          >
            About
          </Link>
          {currentUser ? (
            <>
              <Link to="/profile">
                <img
                  className="rounded-full object-cover w-7 h-7"
                  src={currentUser?.userData?.photo}
                  alt="photo"
                />
              </Link>
              <Link
                onClick={handleSignOut}
                className="hidden md:inline-block lg:inline-block text-lg font-semibold text-slate-500"
                to="/login"
              >
                logOut
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm sm:text-xl font-bold hover:underline"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hidden sm:inline-block text-sm sm:text-xl font-bold hover:underline"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
