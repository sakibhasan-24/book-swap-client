import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { app } from "../../firebase.config";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditBook() {
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [imageMessageError, setImageMessageError] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [booksList, setBooksList] = useState([]);
  const [listError, setListError] = useState(false);
  const [listErrorText, setListErrorText] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
    title: "",
    author: "",
    description: "",
    price: 0,
    address: "",
    genre: "",
    conditions: "",
    borrow: false,
    sell: true,
    fixedPrice: false,
  });

  //
  useEffect(() => {
    // need async operation
    //
    const getBooks = async () => {
      await fetch(
        `https://book-swap-eight.vercel.app/books/getSingleBook/${id}`
      )
        .then((res) => res.json())
        .then((data) => {
          //   console.log(data);
          setFormData(data.book);
        });
      //   console.log(formData);
    };
    getBooks();
  }, [id]);

  const handleChangeFormData = (e) => {
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    if (
      e.target.id === "fixedPrice" ||
      e.target.id === "sell" ||
      e.target.id === "borrow"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }
  };

  //   console.log(files.length + formData.imageUrls.length);
  const handleImageUpload = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((url) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(url),
          });
          setImageMessageError(false);
        })
        .catch((e) => {
          setImageMessageError(
            "image upload failed,need less than 2 mb per images"
          );
        });
    } else {
      setImageMessageError("Maximum 6 images allowed and less than 2 mb");
    }
  };

  const storeImage = (files) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + files.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, files);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.trunc(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            //   console.log("File available at", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };
  //   console.log(files);

  const handleFormData = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setListError(false);
      fetch(`https://book-swap-eight.vercel.app/books/updateuserbooks/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          owner: currentUser.userData._id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            console.log(data);
            setLoading(false);
            setListError(false);
          }
          if (data.success === false) {
            setListError(true);
            setLoading(false);
          }
        });
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  const handleImageDelete = (id) => {
    const newImagesUrl = formData.imageUrls.filter((img, idx) => idx !== id);
    setFormData({ ...formData, imageUrls: newImagesUrl });
  };
  //   console.log(formData);

  const handleShowAllBooks = () => {
    setListError(false);
    fetch(
      `https://book-swap-eight.vercel.app/books/userbooks/${currentUser.userData._id}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setBooksList(data.allBooks);
        setListErrorText(false);
        // console.log(data.allBooks);
      });
    try {
      if (booksList.length === 0) {
        setListErrorText("No Books Found");
      }
    } catch (error) {
      setListErrorText("something went wrong");
    }
  };
  const handleABook = (id) => {
    fetch(`https://book-swap-eight.vercel.app//books/userbooks/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const newBookList = booksList.filter((book) => book._id !== id);
        setBooksList(newBookList);
      });
  };
  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-center font-semibold my-8 text-4xl">Update Book</h1>
      <form
        onSubmit={handleFormData}
        className="flex flex-col  gap-4 max-w-lg mx-auto"
      >
        <div className="">
          <div className="flex flex-col sm:flex-row  gap-4">
            <input
              type="text"
              name=""
              placeholder="title"
              className="bg-slate-200 p-2 focus:outline-none rounded-lg"
              id="title"
              onChange={handleChangeFormData}
              value={formData.title}
            />
            <input
              type="text"
              name=""
              placeholder="author"
              className="bg-slate-200 p-2 focus:outline-none rounded-lg"
              id="author"
              onChange={handleChangeFormData}
              value={formData.author}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              id="genre"
              type="text"
              name=""
              placeholder="genre"
              className="bg-slate-200 p-2 focus:outline-none rounded-lg my-4"
              onChange={handleChangeFormData}
              value={formData.genre}
            />
            <input
              id="address"
              type="text"
              name=""
              placeholder="address"
              onChange={handleChangeFormData}
              value={formData.address}
              className="bg-slate-200 p-2 focus:outline-none rounded-lg my-4"
            />
          </div>
          <textarea
            id="description"
            cols="10"
            placeholder="description"
            onChange={handleChangeFormData}
            value={formData.description}
            rows="5"
            className="bg-slate-200 p-2 focus:outline-none rounded-lg my-4 w-full"
          ></textarea>
          <input
            type="text"
            name=""
            placeholder="new like new good or old"
            id="conditions"
            onChange={handleChangeFormData}
            value={formData.conditions}
            className="bg-slate-200 p-2 focus:outline-none rounded-lg my-4 w-full"
          />
          <div className="flex gap-4 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="borrow"
                onChange={handleChangeFormData}
                checked={formData.borrow}
                className="w-4"
              />
              <span>Borrow</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="fixedPrice"
                onChange={handleChangeFormData}
                className="w-4"
                checked={formData.fixedPrice}
              />
              <span>fixed price</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sell"
                className="w-4"
                onChange={handleChangeFormData}
                checked={formData.sell}
              />
              <span>sell</span>
            </div>
          </div>
          <input
            type="number"
            name=""
            id="price"
            className=" p-2 border-2 border-gray-400 rounded-lg focus:outline-none my-6"
            placeholder="price"
            value={formData.price}
            onChange={handleChangeFormData}
          />
        </div>
        <div>
          <input
            onChange={(e) => setFiles(e.target.files)}
            type="file"
            name=""
            id="images"
            accept="images/*"
            multiple
          />
          <button
            type="button"
            onClick={handleImageUpload}
            className="bg-green-300 p-2 rounded-lg"
          >
            Upload
          </button>
          {imageMessageError && (
            <p className="text-red-600 text-center font-semibold">
              {imageMessageError}
            </p>
          )}
          <div>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <p className="text-center text-green-600">
                uploading...{uploadProgress}%
              </p>
            )}
            {uploadProgress === 100 && (
              <p className="text-green-400">successfully Uploaded</p>
            )}
          </div>

          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, idx) => {
              return (
                <div key={idx} className="w-1/2 my-6">
                  <div className="border-2 border-gray-500 p-2 flex items-center justify-between">
                    <img
                      src={url}
                      alt="images"
                      className="w-[100px] h-[100px] rounded-md object-cover"
                    />
                    <p
                      onClick={() => handleImageDelete(idx)}
                      className="text-red-800 cursor-pointer font-bold hover:text-red-300"
                    >
                      delete
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
        <input
          type="submit"
          value={loading ? "update..." : "update a books"}
          className="p-4 rounded-lg font-bold text-center bg-green-700 cursor-pointer"
        />
        {error && <p className="text-red-600 text-xs">something went wrong</p>}
      </form>
      {/* show all books */}
      <div>
        <button
          onClick={handleShowAllBooks}
          className="w-full text-green-600 font-semibold my-8"
        >
          Show all
        </button>
        <div className="flex items-center flex-col ">
          {booksList &&
            booksList.length > 0 &&
            booksList.map((book) => (
              //   (book) => console.log(book.imageUrls)
              <div
                className="border-4 p-2 flex w-1/2 justify-between    items-center border-sky-500 my-2"
                key={book._id}
              >
                <div className="">
                  <Link to={`/books/${book._id}`}>
                    <img
                      src={book.imageUrls[0]}
                      alt=""
                      className="object-contain w-20 h-20 rounded-lg"
                    />
                  </Link>
                </div>
                <div>
                  <Link to={`/books/${book._id}`}>
                    <h1>{book.title}</h1>
                  </Link>
                </div>
                <div>
                  <p
                    onClick={() => handleABook(book._id)}
                    className="text-red-500 hover:text-red-950 cursor-pointer"
                  >
                    Delete
                  </p>
                  <Link to={`/editbooks/${book._id}`}>
                    <p className="text-green-400 hover:text-green-800 cursor-pointer">
                      Edit
                    </p>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
