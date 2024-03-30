import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="bg-slate-800 text-white">
        <div className="container flex justify-between items-center px-4 py-5 h-14">
          <div className="hover:font-bold flex items-center">
            <span className="text-green-700">&lt;</span>
            Pass
            <span className="text-green-700">OP&gt;</span>
          </div>
          <button className="hover:font-bold rounded-full my-5 flex gap-4">
            <a href="https://github.com/dhruvkapoor01"></a>
            <img
              className="w-10 justify-between items-center"
              src="/icons/github.png"
              alt="Github logo"
            />
            <span className="font-bold">Github</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
