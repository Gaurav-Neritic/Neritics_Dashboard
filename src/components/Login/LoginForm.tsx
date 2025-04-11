import Image from "next/image";
import React from "react";

const LoginForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className=" p-5 grid grid-cols-2 border border-lightBorder dark:border-darkBorder rounded">
        {/* Image  */}
        <div className="">
          <Image src="/login.svg" alt="image" width={400} height={400} />
        </div>
        {/* Login Login */}
        <div className="p-5 border-l border-lightBorder dark:border-darkBorder">
          <h1 className="text-2xl py-5 text-center font-semibold uppercase">
            Login
          </h1>
          <div>
            <form className="flex items-start justify-center flex-col gap-2 ">
              <label>Email:</label>
              <input
                type="text"
                placeholder="Enter email..."
                required
                className="p-2 w-full border border-lightBorder dark:border-darkBorder rounded outline-none placeholder:text-sm"
              />
              <label className="">Password:</label>
              <input
                type="text"
                placeholder="Enter password..."
                required
                className="w-full p-2 border border-lightBorder dark:border-darkBorder rounded outline-none placeholder:text-sm "
              />
              <button
                type="submit"
                className="py-2 my-5 px-3 w-full border border-lightBorder dark:border-darkBorder rounded cursor-pointer"
              >
                Submit
              </button>
              <div className="text-center w-full animate-pulse">
                *Note : (Only Admin Access)
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
