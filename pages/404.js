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
    <div className=" text-3xl pt-20 text-center">
      <h1>Oops...</h1>
      <h2>Page not found</h2>
      <p className=" p-5 rounded-xl mt-48">Redirecting ...</p>
    </div>
  );
}

export default NotFound;
