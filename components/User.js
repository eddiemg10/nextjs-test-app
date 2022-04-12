import React, { useEffect, useState } from "react";

function User(props) {
  const [uname, setUname] = useState("");
  const [pic, setPic] = useState("");

  useEffect(() => {
    async function fetchComments() {
      const response = await fetch(`/api/users/${props.id}`);
      const data = await response.json();
      return data;
    }
    fetchComments().then((data) => {
      setUname(data.name);
      setPic(data.image);
    });
  }, []);

  return (
    <div>
      <div className="flex space-x-5 items-center">
        <img
          src={pic}
          className="object-contain w-[30px] h-[30px] rounded-full"
        />
        <p className="font-thin">{uname}</p>
      </div>
    </div>
  );
}

export default User;
