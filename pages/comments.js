import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Comment from "../components/Comment";
import Head from "next/head";
import { useSession, getSession, signIn } from "next-auth/react";

function comments() {
  const { data: session, status } = useSession();
  const [comment, setComment] = useState("");
  const [flag, setFlag] = useState(true);

  const [comments, setComments] = useState([]);
  const [age, setAge] = useState("");

  const [commentErr, setCommentErr] = useState("");
  const [ageErr, setAgeErr] = useState("");

  useEffect(() => {
    async function fetchComments() {
      const response = await fetch("/api/comments");
      const data = await response.json();

      return data;
    }
    fetchComments().then((data) => {
      setComments(data.reverse());
    });
  }, [flag]);

  const submitComment = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment, age, user: session.user.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.error) {
      data.error.comment
        ? setCommentErr(data.error.comment.message)
        : setCommentErr("");

      data.error.age ? setAgeErr(data.error.age.message) : setAgeErr("");
    } else {
      setAge("");
      setAgeErr("");
      setComment("");
      setCommentErr("");
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
        <title>Comments</title>
      </Head>
      <div className="pt-[60px] text-3xl px-10">Comments</div>
      <div className="w-full mt-9 flex flex-col items-center justify-center">
        <h1 className="text-2xl">Add a Comment to the Database</h1>

        <form className="w-[80%] shadow pt-10 flex flex-col items-center p-5">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="comment"
            type="text"
            placeholder="Enter comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <span className="text-red-500 font-mono justify-start mb-5">
            {commentErr}
          </span>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="age"
            type="number"
            placeholder="Enter Age"
            min="0"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <span className="text-red-500 font-mono mb-10">{ageErr}</span>

          <button
            className="bg-green-500 py-3 rounded-md w-[60%] text-white"
            onClick={submitComment}
          >
            Send
          </button>
        </form>
      </div>

      <div className="flex justify-center">
        <div className="bg-red-200 shadow-xl w-[80%] mt-32 flex flex-col p-5">
          <h1 className="text-3xl"> Comments</h1>

          <Comment comments={comments} />
        </div>
      </div>
    </>
  );
}

export default comments;

comments.getLayout = function PageLayout(page) {
  return (
    <>
      <Navbar />
      {page}
    </>
  );
};
