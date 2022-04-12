import React, { useState } from "react";
import User from "../components/User";

function Comment(props) {
  if (props.comments.error) {
    return <div className="bg-red-600 text-white font-black">ERROR</div>;
  }

  return (
    <div className="flex gap-y-10 flex-col mt-10 items-center">
      {props.comments.map((msg) => (
        <div
          key={msg._id}
          className="bg-white text-xl w-[80%] p-3 rounded-xl shadow:md"
        >
          <p className="pb-5 text-slate-500 flex font-thin">
            <User id={msg.user} /> <span className="pl-2">commented</span>
          </p>
          <div className="flex">
            <div className="w-[10px] h-[40px] mr-3 bg-green-400"></div>
            <p className="text-2xl font-bold">{msg.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comment;
