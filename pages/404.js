import React, { useEffect } from "react";
import { useRouter } from "next/router";

function NotFound() {
  const router = useRouter();
  const options = {
    scroll: false,
  };
  useEffect(() => {
    setTimeout(() => {
      router.push("/", "/", options);
    }, 3000);
  }, []);
  return (
    <div className="bg-pink-200 text-3xl pt-20">
      <h1>Oops...</h1>
      <h2>Page not found</h2>
      <p className="bg-red-400 p-5 rounded-xl mt-48">Go back</p>
    </div>
  );
}

export default NotFound;
