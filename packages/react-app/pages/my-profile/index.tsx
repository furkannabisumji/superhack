import { SetStateAction, useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EmailIcon from "@mui/icons-material/Email";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import WalletIcon from "@mui/icons-material/Wallet";
import ArticleIcon from "@mui/icons-material/Article";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";

import Overview from "@/components/myProfile/overview";
import Products from "@/components/myProfile/products";
import Wallets from "@/components/myProfile/wallets";
import DAO from "@/components/myProfile/DAO";
import Messages from "@/components/myProfile/messages";
import Staking from "@/components/myProfile/staking";
import Lending from "@/components/myProfile/lending";

const MyProfile = () => {
  const [activeIndex, setactiveIndex] = useState(1);
  const handleClick = (index: SetStateAction<number>) => setactiveIndex(index);
  const checkActive = (index: number, className: any) =>
    activeIndex === index ? className : "";

  return (
    <div className="flex flex-row relative justify-between gap-2 md:gap-20 w-full h-screen">
      <div className="flex flex-col fixed left-2 p-2 gap-2 md:gap-5 bg-white text-gray-500 rounded-xl w-1/6 h-fit">
        <div className="flex flex-row gap-5">
          <button
            type="button"
            onClick={() => handleClick(1)}
            className={`nav ${checkActive(
              1,
              "active"
            )} flex flex-row gap-2 items-center p-2 text-base font-normal text-gray-500 rounded-lg transition duration-75 `}
          >
            <DashboardIcon />
            <h1 className="md:block hidden">Profile</h1>
          </button>
        </div>
        <div className="flex flex-row gap-5">
          <button
            type="button"
            onClick={() => handleClick(2)}
            className={`nav ${checkActive(
              2,
              "active"
            )} flex flex-row gap-2 items-center p-2 text-base font-normal text-gray-500 rounded-lg transition duration-75`}
          >
            <EmailIcon />
            <h1 className="md:block hidden">Messages</h1>
          </button>
        </div>
        <div className="flex flex-row gap-5">
          <button
            type="button"
            onClick={() => handleClick(3)}
            className={`nav ${checkActive(
              3,
              "active"
            )} flex flex-row gap-2 items-center p-2 text-base font-normal text-gray-500 rounded-lg transition duration-75`}
          >
            <WalletIcon />
            <h1 className="md:block hidden">Wallet</h1>
          </button>
        </div>
        <div className="flex flex-row gap-5">
          <button
            type="button"
            onClick={() => handleClick(4)}
            className={`nav ${checkActive(
              4,
              "active"
            )} flex flex-row gap-2 items-center p-2 text-base font-normal text-gray-500 rounded-lg transition duration-75`}
          >
            <LocalGroceryStoreIcon />
            <h1 className="md:block hidden">MarketPlace</h1>
          </button>
        </div>

        <hr className="pt-5" />

        <div className="flex flex-row gap-5">
          <button
            type="button"
            // onClick={() => handleClick(4)}
            className={`nav ${checkActive(
              0,
              "active"
            )} flex flex-row gap-2 items-center p-2 text-base font-normal text-gray-500 rounded-lg transition duration-75`}
          >
            {" "}
            <ArticleIcon />
            <h1 className="md:block hidden">Docs</h1>
          </button>
        </div>

        <div className="flex flex-row gap-5">
          <button
            type="button"
            // onClick={() => handleClick(4)}
            className={`nav ${checkActive(
              0,
              "active"
            )} flex flex-row gap-2 items-center p-2 text-base font-normal text-gray-500 rounded-lg transition duration-75`}
          >
            <HelpIcon />
            <h1 className="md:block hidden">Help</h1>
          </button>
        </div>
        <div className="flex flex-row gap-5">
          <button
            type="button"
            // onClick={() => handleClick(4)}
            className={`nav ${checkActive(
              0,
              "active"
            )} flex flex-row gap-2 items-center p-2 text-base font-normal text-red-400 rounded-lg transition duration-75`}
          >
            <LogoutIcon />
            <h1 className="md:block hidden">Delete Acccount</h1>
          </button>
        </div>
      </div>
      <div className="flex ml-20 md:ml-60 w-5/6">
        <div className={`pageContent ${checkActive(1, "active")}`}>
          <div>
            <Overview />
          </div>
        </div>
        <div className={`pageContent ${checkActive(2, "active")}`}>
          <div className="w-full">
            <Messages />
          </div>
        </div>
        <div className={`pageContent ${checkActive(3, "active")}`}>
          <div>
            <Wallets />
          </div>
        </div>

        <div className={`pageContent ${checkActive(4, "active")}`}>
          <div>
            <Products />
          </div>
        </div>
        {/* <div className={`pageContent ${checkActive(5, "active")}`}>
          <div>
            <DAO />
          </div>
        </div>
        <div className={`pageContent ${checkActive(6, "active")}`}>
          <div>
            <Staking />
          </div>
        </div>
        <div className={`pageContent ${checkActive(7, "active")}`}>
          <div>
            <Lending />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MyProfile;
