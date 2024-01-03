// App.js
import React from "react";

const NavBar = () => {
  return (
    <div>
        <div className="navbar border font-serif bg-base-100">
          <div className="flex-1">
            {/* <img
              src={require("./assets/museslist_logo.png")}
              alt="Muse's List"
              className="h-10 w-10 "
            /> */}
            <a
              href="/"
              className="lg:px-1 px-1 font-serif text-black lg:text-2xl text-lg"
            >
              NerdyRent
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
            </ul>
          </div>
        </div>
    </div>
  );
};

export default NavBar;
