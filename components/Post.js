import React from "react";
import User from "../components/User";

function Post(props) {
  console.log(props.posts);
  return (
    <div className="flex flex-wrap gap-14 px-32 mt-32 w-[100%] justify-center">
      {props.posts.map((post) => (
        <div key={post._id} className="w-[400px] p-5 bg-white shadow-xl">
          <img className="w-[400px] h-[400px] object-cover" src={post.image} />

          <div className="pb-5 mt-10 text-slate-500">
            <User id={post.user} />
          </div>

          {post.caption && (
            <div className=" text-lg">
              <span className="font-semibold pr-2">Commented </span>
              {post.caption}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Post;
