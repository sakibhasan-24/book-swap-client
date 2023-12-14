import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className=" max-w-lg mx-auto p-4">
      <h1 className="font-bold text-slate-600 text-center text-4xl mt-8">
        Profile
      </h1>
      <form className="flex flex-col gap-6 ">
        <img
          src={currentUser?.user?.photo}
          className="w-20 h-20 rounded-full object-cover cursor-pointer mt-8 self-center"
          alt="photo"
        />

        <input
          type="text"
          name="username"
          id="username"
          placeholder="username..."
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email..."
          className="border p-3 rounded-lg focus:outline-none"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="********"
          className="border p-3 rounded-lg focus:outline-none"
        />
        <button className="bg-green-950 text-white p-4 rounded-lg font-bold uppercase">
          Update Profile
        </button>
      </form>
      <div className="flex items-center justify-between mt-6">
        <p className="text-red-800 font-bold  cursor-pointer">Delete Account</p>
        <p className="text-red-500 font-bold sm:inline-block md:hidden lg:hidden ">
          Sign Out
        </p>
      </div>
    </div>
  );
}
