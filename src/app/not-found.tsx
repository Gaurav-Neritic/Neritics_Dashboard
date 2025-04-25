import Image from "next/image";
import Link from "next/link";
import "../app/globals.css";
import { House } from "lucide-react";
import { Fira_Code, Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Fira_Code({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function NotFound() {
  return (
    <div
      className={`${inter.className} ${geistMono.variable}" h-screen flex flex-col justify-center items-center`}
    >
      <Image
        src="/404-main.svg"
        alt="404 Image"
        width={900}
        height={900}
        className="mb-4 object-cover "
      />
      <div className="flex flex-col justify-center items-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">
          Oops! Page not found
        </h1>
        <p className="text-lg text-gray-600 capitalize">
          Page you are looking for doesn't exist.
        </p>
        <Link
          href="/"
          className=" flex gap-3 p-2 border border-lightBorder rounded hover:bg-red-500/85 hover:text-white text-md font-bold text-gray-800"
        >
          Return to
          <House className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}
