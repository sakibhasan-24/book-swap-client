export default function CreateBooks() {
  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-center font-semibold my-8 text-4xl">Create Books</h1>
      <form className="flex flex-col  gap-4 max-w-lg mx-auto">
        <div className="">
          <div className="flex flex-col sm:flex-row  gap-4">
            <input
              type="text"
              name=""
              placeholder="title"
              className="bg-slate-200 p-2 focus:outline-none rounded-lg"
              id="title"
            />
            <input
              type="text"
              name=""
              placeholder="author"
              className="bg-slate-200 p-2 focus:outline-none rounded-lg"
              id="author"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              id="genre"
              type="text"
              name=""
              placeholder="genre"
              className="bg-slate-200 p-2 focus:outline-none rounded-lg my-4"
            />
            <input
              id="address"
              type="text"
              name=""
              placeholder="address"
              className="bg-slate-200 p-2 focus:outline-none rounded-lg my-4"
            />
          </div>
          <textarea
            id="description"
            cols="10"
            placeholder="description"
            rows="5"
            className="bg-slate-200 p-2 focus:outline-none rounded-lg my-4 w-full"
          ></textarea>
          <input
            type="text"
            name=""
            placeholder="new like new good or old"
            id="conditions"
            className="bg-slate-200 p-2 focus:outline-none rounded-lg my-4 w-full"
          />
          <div className="flex gap-4 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="borrow" className="w-4" />
              <span>Borrow</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="fixed" className="w-4" />
              <span>fixed price</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-4" />
              <span>sell</span>
            </div>
          </div>
          <input
            type="number"
            name=""
            id="price"
            className=" p-2 border-2 border-gray-400 rounded-lg focus:outline-none my-6"
            placeholder="price"
          />
        </div>
        <div>
          <input type="file" name="" id="images" accept="images/*" multiple />
          <button className="bg-green-300 p-2 rounded-lg">Upload</button>
        </div>
        <input
          type="submit"
          value="Create A books"
          className="p-4 rounded-lg font-bold text-center bg-green-700 cursor-pointer"
        />
      </form>
    </main>
  );
}
