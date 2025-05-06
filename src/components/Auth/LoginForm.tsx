"use client";
import Image from "next/image";
import React, { useState } from "react";
import ToggleMode from "../Theme/ToggleMode";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Loader from "../Loaders/Loader";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function login() {
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post("../api/login", { data });

      if (response.data.data?.isAdmin) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        toast.success("Logged In Successfully");
        router.push("/");
        return response.data.data;
      }
      if (response.data.data === "Requested For Access") {
        return toast.success("Rquested For Access");
      }
    } catch (error) {
      console.log(`Error logging in : ${error}`);
      toast.error("Invalid Credentials");
    }
  }

  const loginMutation = useMutation({
    mutationFn: login,
  });

  const handelLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@neriticindustries')) {
      return toast.success("You aren't allowed", { icon: "🙅🏻‍♀️⚠️" })
    }
    loginMutation.mutate();
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="relative grid w-full grid-cols-2 p-0 mx-5 border rounded lg:max-w-fit lg:p-5 max-sm:grid-cols-1 border-lightBorder dark:border-darkBorder">
        {/* Image  */}
        <div className="">
          <Image
            src="/login.svg"
            alt="image"
            width={400}
            height={400}
            className="hidden lg:block"
          />
        </div>
        {/* Login Login */}
        <div className="p-5 sm:border-l border-lightBorder dark:border-darkBorder">
          <h1 className="py-5 text-2xl font-semibold text-center uppercase">
            Login
          </h1>
          <div>
            <form
              onSubmit={handelLogin}
              className="flex flex-col items-start justify-center gap-2 "
            >
              <label className="text-sm lg:text-base">Email:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email..."
                required
                className="w-full p-2 border rounded outline-none border-lightBorder dark:border-darkBorder placeholder:text-sm"
              />

              <label className="text-sm lg:text-base">Password:</label>
              <div className="relative w-full">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  required
                  className="w-full p-2 border rounded outline-none border-lightBorder dark:border-darkBorder placeholder:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 outline-none cursor-pointer dark:text-gray-400"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full px-3 py-2 my-5 text-sm border rounded cursor-pointer lg:text- border-lightBorder dark:border-darkBorder"
              >
                {loginMutation.isPending ? (
                  <Loader title="Logging In...." />
                ) : (
                  "Login"
                )}
              </button>
              <div className="w-full text-sm text-center lg:text-base">
                Request Admin Access -{" "}
                <Link
                  href={"/signup"}
                  className="text-red-400 hover:text-red-500 hover:underline-offset-4 hover:underline decoration-red-500"
                >
                  SignUp
                </Link>
              </div>
              <div className="w-full text-sm text-center lg:text-base animate-pulse ">
                *Note : (Only Admin Access)
              </div>
            </form>
          </div>
        </div>
        <div className="absolute bg-white -right-5 -top-5 dark:bg-darkMode">
          <ToggleMode />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
