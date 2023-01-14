import React from "react";

function Card(props) {
  return (
    <div
      className={`px-4 py-2 border-2 rounded-md w-full bg-white drop-shadow-lg ${props.className} lg:px-10 py-5`}
    >
      {props.children}
    </div>
  );
}

export default Card;
