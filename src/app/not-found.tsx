import Image from "next/image";
import Link from "next/link";
import "../app/globals.css";
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
      className={`${inter.className} ${geistMono.variable} flex flex-col justify-center items-center`}
    >
      <Image
        src="/404-main.svg"
        alt="404 Image"
        width={800}
        height={800}
        className="mb-4 object-cover h-[500px] w-auto "
      />
      <div className="flex flex-col justify-center items-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">
          Oops! Page not found
        </h1>
        <p className="text-lg text-gray-600 capitalize">
          Page you are looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className=" flex gap-3 p-2 border border-neutral-200 rounded  hover:bg-red-500/80 hover:text-white text-md font-semibold text-gray-800 hover:ring ring-gray-600"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
