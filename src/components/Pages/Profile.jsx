import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
// import getStorage from "redux-persist/es/storage/getStorage";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase.config";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(undefined);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  //   console.log(imageFile);
  const fileRef = useRef(null);
  console.log(imageFile?.name);
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
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = Math.trunc(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setUploadPercentage(progress);
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            switch (error.code) {
              case "storage/unauthorized":
                break;
              case "storage/canceled":
                break;

              case "storage/unknown":
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
            });
          }
        );
      } catch (error) {
        console.log(error);
      }
    }

    // const uploadTask = uploadBytesResumable(storageRef, file);
    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log("Upload is " + progress + "% done");
    //     switch (snapshot.state) {
    //       case "paused":
    //         console.log("Upload is paused");
    //         break;
    //       case "running":
    //         console.log("Upload is running");
    //         break;
    //     }
    //   },
    //   (error) => {
    //     switch (error.code) {
    //       case "storage/unauthorized":
    //         break;
    //       case "storage/canceled":
    //         break;

    //       case "storage/unknown":
    //         break;
    //     }
    //   },
    //   () => {
    //     // Upload completed successfully, now we can get the download URL
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       console.log("File available at", downloadURL);
    //     });
    //   }
    // );
  }, [imageFile]);

  return (
    <div className=" max-w-lg mx-auto p-4">
      <h1 className="font-bold text-slate-600 text-center text-4xl mt-8">
        Profile
      </h1>
      <input
        onChange={(e) => setImageFile(e.target.files[0])}
        type="file"
        id=""
        accept="image/*"
        ref={fileRef}
        hidden
      />
      <form className="flex flex-col gap-6 ">
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser?.user?.photo}
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
