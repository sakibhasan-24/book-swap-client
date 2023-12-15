import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import getStorage from "redux-persist/es/storage/getStorage";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase.config";
import {
  deleteFailure,
  deleteStart,
  deleteSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  //   console.log(currentUser);
  const [imageFile, setImageFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [uploadPercentage, setUploadPercentage] = useState(0);
  //   console.log(imageFile);
  const fileRef = useRef(null);
  //   console.log(imageFile?.name);
  //   console.log(formData);
  //   after image then render

  useEffect(() => {
    // upload image
    if (imageFile) {
      try {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile?.name;
        const storageRef = ref(storage, fileName);
        // console.log(storageRef);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.trunc(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setUploadPercentage(progress);
          },
          (error) => {
            console.log(error);
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              //   console.log("File available at", downloadURL);
              setFormData({ ...formData, photo: downloadURL });
            });
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  }, [imageFile]);
  //   console.log(formData.photo);
  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  //   console.log(formData);
  const handleFormDataUpdate = (e) => {
    e.preventDefault();

    // console.log("clicked");

    try {
      dispatch(updateStart(true));
      fetch(`http://localhost:5000/update/${currentUser?.userData?._id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          //   console.log("update", data);

          if (data.success === false) {
            dispatch(updateFailure(data.message));
            return;
          }
          //   console.log(data.message);
          //   console.log("updated ", data);
          dispatch(updateSuccess(data));
        });
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };
  //   console.log(formData);
  const handleDelete = (id) => {
    try {
      dispatch(deleteStart(true));
      fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("delete", data);
          if (data.success === true) {
            dispatch(deleteSuccess(data));
          }
          navigate("/login");
        });
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };
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
    <div className=" max-w-lg mx-auto p-4">
      <h1 className="font-bold text-slate-600 text-center text-4xl mt-8">
        Profile
      </h1>
      <input
        onChange={(e) => setImageFile(e.target.files[0])}
        type="file"
        accept="image/*"
        ref={fileRef}
        hidden
      />
      <form className="flex flex-col gap-6 " onSubmit={handleFormDataUpdate}>
        <img
          onClick={() => fileRef.current.click()}
          src={formData.photo || currentUser?.userData?.photo}
          className="w-20 h-20 rounded-full object-cover cursor-pointer mt-8 self-center"
          alt="photo"
        />

        {imageFile && (
          <p className="text-center font-semibold text-green-500">
            uploading done upto {uploadPercentage}%
          </p>
        )}
        <input
          type="text"
          name="username"
          defaultValue={currentUser?.userData?.username}
          id="username"
          placeholder="username..."
          className="border p-3 rounded-lg focus:outline-none"
          onChange={handleFormData}
        />
        <input
          type="email"
          name="email"
          id="email"
          defaultValue={currentUser?.userData?.email}
          placeholder="email..."
          className="border p-3 rounded-lg focus:outline-none"
          onChange={handleFormData}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="********"
          className="border p-3 rounded-lg focus:outline-none"
          onChange={handleFormData}
        />
        <button className="bg-green-950 text-white p-4 rounded-lg font-bold uppercase">
          Update Profile
        </button>
      </form>
      <div className="flex items-center justify-between mt-6">
        <p
          onClick={() => handleDelete(currentUser.userData._id)}
          className="text-red-800 font-bold  cursor-pointer"
        >
          Delete Account
        </p>
        <p
          onClick={handleSignOut}
          className="text-red-500 font-bold cursor-pointer sm:inline-block md:hidden lg:hidden "
        >
          Sign Out
        </p>
      </div>
    </div>
  );
}
