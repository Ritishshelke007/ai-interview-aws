"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { User } from "lucide-react";

const Header = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const [openNavbar, setOpenNavbar] = useState(false);
  const toggleNavbar = () => {
    setOpenNavbar((openNavbar) => !openNavbar);
  };
  return (
    <div className="flex justify-around items-center py-6 shadow-sm bg-gray-50/50 h-20 ">
      <div className="flex items-center min-w-max">
        <Link href="/" className="font-semibold flex items-center gap-x-2">
          <div className="flex items-center -space-x-3">
            <span className="h-6 aspect-square bg-[#4845D2]  rounded-full flex" />
            <span className="h-6 aspect-square bg-[#4845D2]  blur rounded-full flex" />
          </div>
          <span className="text-lg text-gray-700 dark:text-gray-300">
            AceYourInterview
          </span>
        </Link>
      </div>
      <div className="flex justify-center items-center gap-10">
        <ul className="hidden md:flex gap-8 font-bold text-lg text-gray-700 ">
          <Link href="/dashboard">
            <li
              className={`hover:text-primary cursor-pointer ${
                pathname == "/dashboard" && "text-primary"
              }`}
            >
              Dashboard
            </li>
          </Link>
          <li
            className={`hover:text-primary cursor-pointer ${
              pathname == "/questions" && "text-primary"
            }`}
          >
            FAQ
          </li>

          <li
            className={`hover:text-primary cursor-pointer ${
              pathname == "/how-it-works" && "text-primary"
            }`}
          >
            How it Works?
          </li>
        </ul>
        {user ? (
          <UserButton />
        ) : (
          <Link
            href="/sign-in"
            className="flex items-center gap-2 h-12 px-6 rounded-full bg-[#4845D2] text-white hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Sign in
          </Link>
        )}
      </div>
    </div>
    // <header className="absolute left-0 top-0 w-full flex items-center h-20 z-40 shadow-sm">
    //   <nav className="relative mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex gap-x-5 justify-between items-center">
    //     <div className="flex items-center min-w-max">
    //       <Link href="/" className="font-semibold flex items-center gap-x-2">
    //         <div className="flex items-center -space-x-3">
    //           <span className="h-6 aspect-square bg-[#4845D2]  rounded-full flex" />
    //           <span className="h-6 aspect-square bg-[#4845D2]  blur rounded-full flex" />
    //         </div>
    //         <span className="text-lg text-gray-700 dark:text-gray-300">
    //           AceYourInterview
    //         </span>
    //       </Link>
    //     </div>
    //     <div
    //       className={`
    //             absolute top-full  left-0 bg-white dark:bg-gray-950 lg:!bg-transparent border-b border-gray-200 dark:border-gray-800 py-8 lg:py-0 px-5 sm:px-10 md:px-12 lg:px-0 lg:border-none lg:w-max lg:space-x-16 lg:top-0 lg:relative  lg:flex duration-300 lg:transition-none ease-linear
    //             ${
    //               openNavbar
    //                 ? "translate-y-0 opacity-0 visible"
    //                 : "translate-y-10 opacity-0 invisible lg:visible  lg:translate-y-0 lg:opacity-100"
    //             }
    //         `}
    //     >
    //       <ul className="flex flex-col font-semibold lg:flex-row gap-6 lg:items-center text-gray-700 dark:text-gray-300 lg:w-full lg:justify-center">
    //         <li>
    //           <Link
    //             href="#"
    //             className="px-2 transition-colors  py-2.5 hover:text-primary "
    //           >
    //             Home
    //           </Link>
    //         </li>
    //         <li>
    //           <Link
    //             href="#"
    //             className="px-2 transition-colors  py-2.5 hover:text-primary "
    //           >
    //             How it Works
    //           </Link>
    //         </li>
    //         <li>
    //           <Link
    //             href="#"
    //             className="px-2 transition-colors  py-2.5 hover:text-primary "
    //           >
    //             FAQ
    //           </Link>
    //         </li>
    //       </ul>
    //       <div className="flex flex-col sm:flex-row sm:items-center gap-4  lg:min-w-max mt-10 lg:mt-0">
    //         {user ? (
    //           <UserButton />
    //         ) : (
    //           <Link
    //             href={"/sign-in"}
    //             className="flex items-center justify-center w-full sm:w-auto h-12 px-6 rounded-full bg-primary  text-white  hover:scale-105 transition-all duration-300 ease-in-out"
    //           >
    //             Sign in
    //           </Link>
    //         )}
    //       </div>
    //     </div>
    //     <div className="flex items-center lg:hidden">
    //       <button
    //         onClick={() => {
    //           toggleNavbar();
    //         }}
    //         aria-label="Toggle navbar"
    //         className="outline-none border-l border-l-gray-100 dark:border-l-gray-800 pl-3 relative py-3 children:flex"
    //       >
    //         <span
    //           aria-hidden="true"
    //           className={`
    //                                 h-0.5 w-6 rounded bg-gray-800 dark:bg-gray-300 transition duration-300
    //                                 ${
    //                                   openNavbar
    //                                     ? "rotate-45 translate-y-[0.33rem]"
    //                                     : ""
    //                                 }
    //                             `}
    //         />
    //         <span
    //           aria-hidden="true"
    //           className={`
    //                                 mt-2 h-0.5 w-6 rounded bg-gray-800 dark:bg-gray-300 transition duration-300
    //                                 ${
    //                                   openNavbar
    //                                     ? "-rotate-45 -translate-y-[0.33rem]"
    //                                     : ""
    //                                 }
    //                             `}
    //         />
    //       </button>
    //     </div>
    //   </nav>
    // </header>
  );
};

export default Header;
