import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Head from "next/head";
import { useSession, signIn } from "next-auth/react";
import Post from "../components/Post";

function posts() {
  const { data: session, status } = useSession();

  const [caption, setCaption] = useState("");
  const [picErr, setpicErr] = useState("");
  const [posts, setPosts] = useState([]);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("/api/posts");
      const data = await response.json();
      return data;
    }
    fetchPosts().then((data) => {
      setPosts(data.reverse());
    });
  }, [flag]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "pictureUpload"
    );

    const addedPic = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", addedPic);

    formData.append("upload_preset", "picture-uploads");
    const data = await fetch(
      "https://api.cloudinary.com/v1_1/djchgntmp/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    const imageURL = data.secure_url;

    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ image: imageURL, user: session.user.id, caption }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data2 = await response.json();

    if (data2.error) {
      data2.error.image ? setpicErr(data2.error.image.message) : setpicErr("");
    } else {
      setCaption("");
      setpicErr("");
    }
    setFlag(!flag);
  };

  if (status === "loading") {
    return <h1 className="pt-24">Loading...</h1>;
  }
  if (status === "unauthenticated") {
    return signIn();
  }
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <div className="pt-[60px] text-3xl px-10">Posts</div>;
      <div className="flex justify-center">
        <div className="bg-red-100 w-[40%]  shadow-md p-6">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-10 items-center"
          >
            <input
              className="border border-solid border-gray-300"
              type="file"
              accept="image/*"
              name="pictureUpload"
            />
            <span className="text-red-500 font-mono justify-start">
              {picErr}
            </span>
            <input
              className="border border-solid border-gray-300 w-[90%] p-2 rounded-md bg-transparent"
              type="text"
              placeholder="Enter caption(Optional)"
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
            />
            <button
              className="bg-green-400 p-2 rounded-md text-white font-bold"
              type="submit"
            >
              Post photo
            </button>
          </form>
        </div>
      </div>
      <div className="">
        <Post posts={posts} />
      </div>
    </>
  );
}

export default posts;

posts.getLayout = function PageLayout(page) {
  return (
    <>
      <Navbar />
      {page}
    </>
  );
};
