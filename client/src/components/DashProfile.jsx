import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabase";
import imageCompression from "browser-image-compression";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUsereStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DashProfile = () => {
  // Get the current user from the Redux store
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  // State to hold the image URL for preview
  const [imageFileUrl, setImageFileUrl] = useState(null);
  // State to track whether an upload is in progress
  const [uploadingImage, setUploadingImage] = useState(false);
  // State to track the upload progress as a percentage
  const [progress, setProgress] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  // Reference to the hidden file input element
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = async (e) => {
    // Get the first file selected
    const file = e.target.files[0];
    if (file && isImageFileType(file)) {
      try {
        // Compress the image before upload, to reduce the size
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
        });
        setImageFile(compressedFile);
        setImageFileUrl(URL.createObjectURL(compressedFile)); // Create a temporary URL
        setImageUploadError(null); // Clear any previous error
      } catch (error) {
        console.error("Error compressing image:", error);
        setImageUploadError("Failed to compress image.");
      }
    } else {
      setImageUploadError("Only image files are allowed.");
    }
  };

  // Function to validate if the file type is an image
  const isImageFileType = (file) => {
    const allowedTypes = [
      "image/jpg",
      "image/png",
      "image/jpeg",
      "image/gif",
      "image/webp",
    ];
    return allowedTypes.includes(file.type);
  };

  // Function to handle image upload to Supabase
  const uploadImage = async () => {
    setUploadingImage(true);
    setProgress(0);

    const fileName = `${new Date().getTime()}-${imageFile.name}`;
    const filePath = `users/${fileName}`; // Define a path in the storage bucket

    try {
      // Start a simulated upload process with progress updates
      for (let i = 0; i <= 100; i += 10) {
        setTimeout(() => setProgress(i), i * 100);
      }

      // Upload the file to Supabase storage
      const { error } = await supabase.storage
        .from("techno-sphere")
        .upload(filePath, imageFile);
      if (error) {
        setImageUploadError(error.message);
        setImageFile(null);
        setImageFileUrl(null);
        return;
      }

      // Get the public URL for the uploaded image
      const { data: url } = supabase.storage
        .from("techno-sphere")
        .getPublicUrl(filePath);
      if (url) {
        setImageFileUrl(url.publicUrl); // Update the image URL for display
        setFormData({ ...formData, profilePicture: url.publicUrl }); // Update the formData to include the image URL for profile picture
      }
    } catch (error) {
      setImageUploadError(error.message);
    } finally {
      setUploadingImage(false); // Reset uploadingImage state
      setProgress(100); // Complete the progress bar
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (uploadingImage) {
      setUpdateUserError("Please wait for image to upload...");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
  useEffect(() => {

    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check-token", {
          credentials: "include",
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        if (response.status === 401) {
          navigate("/sign-in");
        }
      } catch (error) {
        console.error("Authentication check failed: ", error);
        navigate("/sign-in");
      }
    };
    checkAuth();
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile, navigate]);

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUsereStart);
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/sign-out", {
        method: "POST",
      });
      const data = res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess(data));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        {/*When the dev is clicked, it triggers filePickerRef.current.click(), which programatically clicks
          the hidden file input, allowing user to interacting with the file input. */}
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {uploadingImage && (
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: "#0ce835",
                },
                text: {
                  fill: theme === "dark" ? "#ffffff" : "#174f91",
                  fontSize: "16px",
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              uploadingImage ? "blur-sm opacity-50" : ""
            }`}
          />
        </div>
        {uploadingImage && (
          <Alert color="info">{"Please wait for image to upload..."}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="greenToBlue" outline disabled={loading || uploadingImage}>
          { loading ? "Loading..." : "Update"}
        </Button>
        { currentUser.isAdmin && (
          <Link to={'/create-post'}>
            <Button 
              type="button"
              gradientDuoTone="purpleToBlue"
              className="w-full">
                Create a post
              </Button>
          </Link>
        )}
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignOut} className="cursor-pointer">
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}

      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}

      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashProfile;
