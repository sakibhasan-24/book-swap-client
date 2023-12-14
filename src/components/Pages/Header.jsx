import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  //   console.log(currentUser.user.photo);
  return (
    <header className="bg-slate-300 shadow-lg">
      <div className="flex justify-between items-center  p-4 max-w-6xl mx-auto">
        <h1 className="text-xs sm:text-xl font-bold flex flex-wrap">
          <Link to="/">
            Book <span className="text-orange-700">Swap</span>
          </Link>
        </h1>
        <form className="bg-slate-100 rounded-lg flex items-center p-3">
          <input
            className="  bg-transparent rounded-lg focus:outline-none focus:shadow-none w-24 sm:w-64 "
            type="text"
            placeholder="Search"
          />
          <CiSearch />
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
                  src={currentUser?.user?.photo}
                  alt="photo"
                />
              </Link>
              <Link
                className="text-lg font-semibold text-slate-500"
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
