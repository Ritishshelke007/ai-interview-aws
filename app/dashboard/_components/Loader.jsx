import React from "react";

const Loader = ({ message }) => {
  return (
    <div className="gap-4 w-full flex items-center justify-center h-96 mt-10">
      <div className="w-20 h-20 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-[#4845D2] rounded-full">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="1em"
          width="1em"
          className="animate-ping"
        ></svg>
      </div>
      {message && <h2>{message}</h2>}
    </div>
  );
};

export default Loader;
