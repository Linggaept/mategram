"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaRegListAlt } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { BsPlayBtn } from "react-icons/bs";
import Profil from "./sidebar/profil";
import Akademi from "./sidebar/akademi";
import Subscription from "./sidebar/subscription";
import Penghasilan from "./sidebar/penghasilan";

export const SidebarWithHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [activeTab, setActiveTab] = useState("Profil");

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsDesktop(true);
        setIsOpen(true);
      } else {
        setIsDesktop(false);
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Profil":
        return <Profil />;
      case "Akademi":
        return <Akademi />;
      case "Subscription":
        return <Subscription />;
      case "Penghasilan":
        return <Penghasilan />;
      default:
        return (
          <div className="p-4 text-black">Pilih tab untuk melihat konten.</div>
        );
    }
  };

  return (
    <div className="bg-gray-100 w-full">
      <div className="flex bg-white border-b-2 border-gray-200 fixed w-full p-5 justify-between z-10">
        {!isDesktop ? (
          isOpen ? (
            <button onClick={toggleSidebar} className="text-blue-600 text-2xl">
              <IoCloseOutline />
            </button>
          ) : (
            <button onClick={toggleSidebar} className="text-blue-600 text-lg">
              <GiHamburgerMenu />
            </button>
          )
        ) : (
          <button className="text-blue-600 font-semibold text-lg">
            Kembali
          </button>
        )}

        <div className="w-full flex justify-end">
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={39}
            height={39}
            className="object-cover aspect-square self-place-end justify-end"
          />
        </div>
      </div>
      <div className="flex min-h-screen">
        <div
          className={`fixed bg-white z-50 text-gray-800 w-64 h-full transition-transform border-r-2 border-gray-200 ${
            isOpen ? "translate-x-0 mt-20" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <nav>
            <ul>
              <li
                className={`mt-4 p-2 cursor-pointer flex items-center text-lg font-semibold gap-2 ${
                  activeTab === "Profil"
                    ? "bg-white text-blue-600"
                    : "hover:bg-blue-600 hover:text-white text-gray-400"
                }`}
                onClick={() => setActiveTab("Profil")}
              >
                <span className="ml-4">
                  <IoPersonCircleOutline className="text-2xl font-semibold" />
                </span>
                Profil
              </li>
              <li
                className={`p-2 cursor-pointer flex items-center text-lg font-semibold gap-2 ${
                  activeTab === "Akademi"
                    ? "bg-white text-blue-600"
                    : "hover:bg-blue-600 hover:text-white text-gray-400"
                }`}
                onClick={() => setActiveTab("Akademi")}
              >
                <span className="ml-4">
                  <BsPlayBtn className="text-2xl font-semibold" />
                </span>
                Akademi
              </li>
              <li
                className={`p-2 cursor-pointer flex items-center text-lg font-semibold gap-2 ${
                  activeTab === "Subscription"
                    ? "bg-white text-blue-600"
                    : "hover:bg-blue-600 hover:text-white text-gray-400"
                }`}
                onClick={() => setActiveTab("Subscription")}
              >
                <span className="ml-4">
                  <FaRegListAlt className="text-2xl font-semibold" />
                </span>
                Subscription
              </li>
              <li
                className={`p-2 cursor-pointer flex items-center text-lg font-semibold gap-2 ${
                  activeTab === "Penghasilan"
                    ? "bg-white text-blue-600"
                    : "hover:bg-blue-600 hover:text-white text-gray-400"
                }`}
                onClick={() => setActiveTab("Penghasilan")}
              >
                <span className="ml-4">
                  <IoWalletOutline className="text-2xl font-semibold" />
                </span>
                Penghasilan
              </li>
              <li
                className="p-2 text-red-600 hover:bg-red-600 hover:text-white cursor-pointer flex items-center text-lg font-semibold gap-2"
                onClick={logout}
              >
                <span className="ml-4">
                  <CiLogout className="text-2xl font-semibold" />
                </span>
                Keluar
              </li>
            </ul>
          </nav>
        </div>
        <div
          className={`flex-1 p-4 ${isDesktop ? "ml-64" : ""} mt-20`} // Adjust margin for content area
        >
          <main>{renderContent()}</main>
        </div>
      </div>
    </div>
  );
};

export default SidebarWithHeader;
