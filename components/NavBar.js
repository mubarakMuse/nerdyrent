// App.js
import React from "react";
import logo from "@/app/icon.png";
import Image from "next/image";
import config from "@/config";

const NavBar = () => {
  return (
    <div>
      <div className="navbar border font-serif bg-base-100">
        <div className="flex-1">
          <Image
            src={logo}
            alt={`${config.appName} logo`}
            priority={true}
            className="w-6 h-6"
            width={24}
            height={24}
          />
          <a href="/" className="lg:px-1 px-1 font-serif lg:text-2xl text-lg">
            <span className="text-blue-600 font-bold">SuperEasy</span>
            <span className="text-gray-900 font-bold">Rent</span>
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu text-sm menu-horizontal">
            {/* <li>
                <a href="/submissions">Submissions</a>
              </li>
              <li>
                <a href="/deals">Deals</a>
              </li> */}
            <li>
              <a href="https://forms.gle/omwCxkz1YUAmLiMb9">
                Add your apartment
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
