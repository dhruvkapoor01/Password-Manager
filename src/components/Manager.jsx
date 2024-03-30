import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast("Copied to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = (params) => {
    passwordRef.current.type = "text";

    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eyes.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      const newPasswordArray = [...passwordArray, { ...form, id: uuidv4() }];
      setform({ site: "", username: "", password: "" });
      setPasswordArray(newPasswordArray);
      localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
    }
    else{
      toast('Error: No Password to add')
    }
  };

  const deletePassword = (id) => {
    console.log("Deleting pass with id ", id);
    let confirm = window.confirm(
      "Are you sure you want to delete this password?"
    );
    if (confirm === true) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
    }
  };
  const editPassword = (id) => {
    console.log("Editing pass with id ", id);
    setform(passwordArray.filter((i) => i.id === id)[0]);
    let confirm = window.confirm(
      "Are you sure you want to edit this password?"
    );
    if (confirm === true) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <ToastContainer />
      <div className=" mx-auto bg-white max-w-4xl md:mycontainer">
        <h1 className="bg-white items-center text-4xl text font-bold text-center">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP&gt;</span>
        </h1>
        <p className="bg-white text-green-900 text-center ">
          Your password is safe and secured
        </p>
        <div className="text-white bg-white flex flex-col p-2 bg-slate-50 gap-8 items-center ">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Website URL"
            className="rounded-full border border-green-500 w-full text-black p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full text-black p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full text-black p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-0 text-black right-[1px] top-[3px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eyes.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-200 hover:bg-green-500 rounded-full px-3 py-2 w-fit text-black hover: border border-green-400"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div>
          <div className="passwords">
            <h2 className="font-bold text-2xl py-4 ">Your Passwords</h2>
            {passwordArray.length === 0 && <div>No Passwords to show</div>}
            {passwordArray.length != 0 && (
              <table className="table-auto w-full">
                <thead className="bg-pink-300 text-black">
                  <tr>
                    <th>Website URL</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-pink-100">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="flex py-2 border border-white items-center justify-center text-center gap-4 w-32">
                          <div
                            className="lordiconcopy cursor-pointer w-5"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                            <a href={item.site} target="_blank">
                              {item.site}
                            </a>
                          </div>
                        </td>
                        <td className="py-2 border border-white text-center ">
                          <div className="flex items-center justify-center gap-3">
                            <div
                              className="cursor-pointer w-5"
                              onClick={() => {
                                copyText(item.username);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                            <span>{item.username}</span>
                          </div>
                        </td>
                        <td className=" py-2 border border-white  text-center ">
                          <div className="flex items-center justify-center gap-3">
                            <div
                              className="cursor-pointer w-5 "
                              onClick={() => {
                                copyText(item.password);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                            <span>{item.password}</span>
                          </div>
                        </td>
                        <td className=" py-2 border border-white  text-center ">
                          <span
                            className="cursor-pointer mx-2"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/wpyrrmcq.json"
                              trigger="hover"
                              style={{ width: "19px", height: "19px" }}
                            ></lord-icon>
                          </span>

                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              style={{ width: "19px", height: "19px" }}
                            ></lord-icon>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
