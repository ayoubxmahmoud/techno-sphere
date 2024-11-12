import React, { useEffect, useState } from "react";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { supabase } from "../supabase";

import imageCompression from "browser-image-compression";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = () => {
  const [postData, setPostData] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });
  const [fileImage, setFileImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);
  const { theme } = useSelector((state) => state.theme);
  const [publishError, setPublishError] = useState(null);

  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

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

    const fetchPost = async () => {
      const res = await fetch(`/api/post/getposts?postId=${postId}`);
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        setPublishError(data.message);
        return;
      } else {
        setPublishError(null);
        setPostData(data.posts[0]);
      }
    };
    fetchPost();
  }, [postId, navigate]);

  // Handle input changes for text and select inputs
  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.id]: e.target.value });
  };

  // Handle file input change for image selection and compression
  const handlePostImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && isImageFileType(file)) {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
        });
        setFileImage(compressedFile);
        setImageUrl(URL.createObjectURL(compressedFile));
        setImageUploadError(null);
      } catch (error) {
        setImageUploadError("Failed to compress image.");
        setFileImage(null);
      }
    } else {
      setImageUploadError("Only image files are allowed");
    }
  };

  // Check if the uploaded file is an allowed image type
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

  // Upload image to Supabase storage and retrieve its public URL
  const uploadPostImage = async () => {
    setUploadingImage(true);
    setProgress(0);

    if (!fileImage) {
      setImageUploadError("Please select an image");
      setUploadingImage(false);
      return;
    }
    const fileName = `${new Date().getTime()}-${fileImage.name}`;
    const filePath = `posts/${fileName}`;

    try {
      // Start a simulated upload process with progress updates
      for (let i = 0; i <= 100; i += 10) {
        setTimeout(() => setProgress(i), i * 100);
      }
      // Upload image to Supabase storage
      const { error } = await supabase.storage
        .from("techno-sphere")
        .upload(filePath, fileImage);
      if (error) {
        setImageUploadError(error.message);
        setFileImage(null);
        setImageUrl(null);
        setUploadingImage(false);
        return;
      }
      // Get the public URL of the uploaded image
      const { data: url } = supabase.storage
        .from("techno-sphere")
        .getPublicUrl(filePath);
      if (url) {
        setImageUrl(url.publicUrl);
        setPostData({ ...postData, image: url.publicUrl });
      }
    } catch (error) {
      setImageUploadError(error.message);
    } finally {
      setUploadingImage(false);
      setProgress(100);
    }
  };

  // Handle form submission to create a new post
  const handleSubmitPost = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `/api/post/update/${currentUser._id}/${postData._id}`,
        {
          method: "PUT",
          headers: {
            // Corrected to "headers"
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      } else {
        setPublishError(data.message);
      }
    } catch (error) {
      setPublishError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmitPost}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={handleChange}
            value={postData.title || ""}
          />
          <Select
            onChange={handleChange}
            id="category"
            value={postData.category || ""}
          >
            <option value="javascript">Javascript</option>
            <option value="react">React</option>
            <option value="nodejs">Node Js</option>
            <option value="express">Express</option>
            <option value="mongodb">Mongodb</option>
            <option value="ai">AI and Data</option>
            <option value="cybersecurity">Cybersecurity</option>
            <option value="news">News</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-blue-800 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={handlePostImageChange}
          />
          <Button
            type="button"
            gradientDuoTone="greenToBlue"
            size="sm"
            outline
            onClick={uploadPostImage}
            disabled={uploadingImage}
          >
            {uploadingImage ? (
              <div className="w-16 h-16 flex items-center justify-center">
                <CircularProgressbar
                  value={progress}
                  text={`${progress}%`}
                  strokeWidth={5}
                  styles={{
                    root: {
                      width: "50px", // Adjust size to fit within the button
                      height: "50px",
                    },
                    path: {
                      stroke: "#0ce835",
                    },
                    trail: {
                      stroke: "rgba(0,0,0,0.2)",
                    },
                    text: {
                      fill: theme === "dark" ? "#ffffff" : "#032042",
                      fontSize: "25px",
                    },
                  }}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {uploadingImage && (
          <Alert color="info">{"Please wait for image to upload..."}</Alert>
        )}

        {imageUploadError && (
          <Alert color="failure" className="mt-5">
            {imageUploadError}
          </Alert>
        )}
        {postData.image && (
          <img
            src={postData.image || ""}
            alt="post-image"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(content) => setPostData({ ...postData, content })} // Update content in postData
          value={postData.content || ""}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          disabled={uploadingImage}
        >
          Update post
        </Button>
      </form>
      {publishError && (
        <Alert color="failure" className="mt-5">
          {publishError}
        </Alert>
      )}
    </div>
  );
};

export default UpdatePost;
