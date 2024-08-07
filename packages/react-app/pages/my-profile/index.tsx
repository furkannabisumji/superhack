import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { SetStateAction, useEffect, useState } from "react";

const MyProfile = () => {
  const [activeIndex, setactiveIndex] = useState(1);
  const handleClick = (index: SetStateAction<number>) => setactiveIndex(index);
  const checkActive = (index: number, className: any) =>
    activeIndex === index ? className : "";

  return (
    <div>
      <aside
        id="default-sidebar"
        className="fixed top-10 bottom-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidenav"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleClick(1)}
                className={`nav ${checkActive(
                  1,
                  "active"
                )} flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">Overview</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`nav ${checkActive(
                  2,
                  "active"
                )} flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                onClick={() => handleClick(2)}
                aria-controls="dropdown-pages"
                data-collapse-toggle="dropdown-pages"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Products
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleClick(3)}
                className={`nav ${checkActive(
                  3,
                  "active"
                )} flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                aria-controls="dropdown-sales"
                data-collapse-toggle="dropdown-sales"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Wallet
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleClick(4)}
                className={`nav ${checkActive(
                  4,
                  "active"
                )} flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                aria-controls="dropdown-sales"
                data-collapse-toggle="dropdown-sales"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Messages
                </span>
              </button>
            </li>
          </ul>
          <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Docs</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3">Help</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                </svg>
                <span className="ml-3 text-red-400">Delete Account</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <div className={`pageContent ${checkActive(1, "active")}`}>
        <div className="bg-white md:mx-auto rounded shadow-xl w-full md:w-2/3 overflow-hidden -mt-10">
          <div className="h-[140px] bg-gradient-to-r from-slate-400 to-slate-500"></div>
          <div className="px-5 py-2 flex flex-col gap-3 pb-6">
            <div className="h-[90px] shadow-md w-[90px] rounded-full border-4 overflow-hidden -mt-14 border-white">
              <img
                src="https://randomuser.me/api/portraits/women/9.jpg"
                className="w-full h-full rounded-full object-center object-cover"
              />
            </div>
            <div className="flex flex-row justify-between gap-2">
              <div className="">
                <h3 className="text-xl text-slate-900 relative font-bold leading-6">
                  Dadda Hicham
                </h3>
                <p className="text-sm text-gray-600">@daddasoft</p>

                <div className="flex flex-row gap-2 text-black text-xs">
                  <p>40 Following</p>
                  <p>35 Followers</p>
                  <p>10 Subscribers</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 ">
                <div className="flex gap-3 flex-wrap">
                  <span className="rounded-sm bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                    Developer
                  </span>
                  <span className="rounded-sm bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                    Design
                  </span>
                  <span className="rounded-sm bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                    Managements
                  </span>
                  <span className="rounded-sm bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800">
                    Projects
                  </span>
                </div>
                <div className="flex gap-2 justify-end">
                  {/* edit button*/}
                  <Link
                    href="/"
                    className="rounded-full border border-slate-500 bg-slate-500 py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
                  >
                    edit
                  </Link>
                </div>
              </div>
            </div>

            <h4 className="text-md text-black font-medium leading-3">About</h4>
            <p className="text-sm text-stone-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere
              dolores aliquid sequi sunt iusto ipsum earum natus omnis
              asperiores architecto praesentium dignissimos pariatur, ipsa cum?
              Voluptate vero eius at voluptas?
            </p>
          </div>
        </div>
      </div>
      <div className={`pageContent ${checkActive(2, "active")}`}>
        <div className="bg-white md:mx-auto rounded shadow-xl w-full md:w-2/3 overflow-hidden -mt-10">
          <div className="h-[140px] bg-gradient-to-r from-slate-400 to-slate-500">
            <div className="flex flex-row px-10 py-20 justify-between">
              <h1 className="text-3xl">Products</h1>
              <button
                className="rounded-full border border-slate-500 bg-white hover:bg-slate-500 hover:text-white  py-1.5 px-5 text-black transition-all text-center text-sm font-inter flex items-center justify-center"
                onClick={() => {}}
              >
                Mint NFTs
              </button>
            </div>
          </div>
          <div className="px-5 py-2 flex flex-col gap-3 pb-6">
            {/* user products */}
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
      </div>
      <div className={`pageContent ${checkActive(3, "active")}`}>
        <div className="bg-white md:mx-auto rounded shadow-xl w-full md:w-2/3 overflow-hidden -mt-10">
          <div className="h-[140px] bg-gradient-to-r from-slate-400 to-slate-500">
            <div className="flex flex-row px-10 py-20 justify-between">
              <h1 className="text-3xl">Connected Wallets</h1>
              {/* will show a pop up of available wallets */}
              {/* base or minipay */}
              <button
                className="rounded-full border border-slate-500 bg-white hover:bg-slate-500 hover:text-white  py-1.5 px-5 text-black transition-all text-center text-sm font-inter flex items-center justify-center"
                onClick={() => {}}
              >
                Connect wallet
              </button>
            </div>
          </div>
          <div>{/* connected wallets */}</div>
        </div>
      </div>

      <div className={`pageContent ${checkActive(4, "active")}`}>
        <div className="bg-white md:mx-auto rounded shadow-xl w-full md:w-2/3 overflow-hidden -mt-10">
          <div className="h-[140px] bg-gradient-to-r from-slate-400 to-slate-500">
            <div className="flex flex-row px-10 py-20 justify-between">
              <h1 className="text-3xl">Messages</h1>
              {/* will show a pop up of available wallets */}
              {/* base or minipay */}
            </div>
          </div>
          <div>{/* messages */}</div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
