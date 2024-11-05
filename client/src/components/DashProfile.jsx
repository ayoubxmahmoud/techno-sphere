import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabase";
import imageCompression from "browser-image-compression";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";

const DashProfile = () => {
  // Get the current user from the Redux store
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  // State to hold the image URL for preview
  const [imageFileUrl, setImageFileUrl] = useState(null);
  // State to track whether an upload is in progress
  const [uploading, setUploading] = useState(false);
  // State to track the upload progress as a percentage
  const [progress, setProgress] = useState(0); 
  const [imageUploadError, setImageUploadError] = useState(null);
  // Reference to the hidden file input element
  const filePickerRef = useRef();
  const { theme } = useSelector((state) => state.theme);

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
    setUploading(true);
    setProgress(0);

    const fileName = `${new Date().getTime()}-${imageFile.name}`;
    const filePath = `users/${fileName}`;// Define a path in the storage bucket

    try {
      // Start a simulated upload process with progress updates
      for (let i = 1; i <= 100; i += 10) {
        setTimeout(() => setProgress(i), i * 100);
      }

      // Upload the file to Supabase storage
      const { error } = await supabase.storage
        .from("techno-sphere")
        .upload(filePath, imageFile);
      if (error){
        setImageUploadError(error.message);
        setImageFile(null);
        setImageFileUrl(null);
        return;
      }

      // Get the public URL for the uploaded image
      const { data: url } = supabase.storage
        .from("techno-sphere")
        .getPublicUrl(filePath);
      setImageFileUrl(url.publicUrl); // Update the image URL for display
    } catch (error) {
      setImageUploadError(error.message);
    } finally {
      setUploading(false); // Reset uploading state
      setProgress(100); // Complete the progress bar
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
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
          {uploading && (
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
              uploading ? "blur-sm opacity-50" : ""
            }`}
          />
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {uploading && <Alert color="info">Uploading image...</Alert>}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="password" />
        <Button type="submit" gradientDuoTone="greenToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
