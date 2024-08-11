import HouseIcon from "@mui/icons-material/House";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EmailIcon from "@mui/icons-material/Email";
import ArticleIcon from "@mui/icons-material/Article";
import HelpIcon from "@mui/icons-material/Help";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AgricultureIcon from "@mui/icons-material/Agriculture";

import { useSocialConnect } from "@/SocialConnect/useSocialConnect";
import SocialConnectUI from "@/components/SocialConnectUI";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // const { data: session } = useSession();

  // const { connect } = useConnect();

  return (
    <>
      <SocialConnectUI
        isOpen={isOpen}
        closeModal={() => {
          setIsOpen(false);
        }}
      />
      <Disclosure as="nav" className="bg-white fixed top-0 left-0 right-0 z-10">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-10 justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black focus:outline-none focus:ring-1 focus:ring-inset focus:rounded-none focus:ring-black">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    {/* logo will be here */}

                    {/* <Image
                      className="block h-8 w-auto sm:block lg:block"
                      src="/logo.svg"
                      width="24"
                      height="24"
                      alt="Celo Logo"
                    /> */}
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <a
                      href="/"
                      className="inline-flex items-center px-1 pt-1 text-sm md:text-lg font-medium text-black"
                    >
                      Home
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 p-2 pb-4 text-gray-500">
                <div className="flex flex-row gap-5">
                  <HouseIcon />
                  <Link href="/my-profile">
                    <h1>Profile</h1>
                  </Link>
                </div>
                <div className="flex flex-row gap-5">
                  <HouseIcon />
                  <Link href="/">
                    <h1>Feed</h1>
                  </Link>
                </div>

                <div className="flex flex-row gap-5">
                  <EmailIcon />
                  <Link href="/">
                    <h1>Messages</h1>
                  </Link>
                </div>
                <div className="flex flex-row gap-5">
                  <LocalGroceryStoreIcon />
                  <Link href="/marketplace">
                    <h1>MarketPlace</h1>
                  </Link>
                </div>
                <div className="flex flex-row gap-5">
                  <AccountBalanceIcon />
                  <Link href="/DAO">
                    <h1>Governance</h1>
                  </Link>
                </div>
                <div className="flex flex-row gap-5">
                  <ShowChartIcon />
                  <Link href="/DAO">
                    <h1>Staking</h1>
                  </Link>
                </div>
                <div className="flex flex-row gap-5">
                  <AgricultureIcon />
                  <Link href="/DAO">
                    <h1>Yield Farming</h1>
                  </Link>
                </div>

                <hr className="pt-5" />

                <div className="flex flex-row gap-5">
                  <ArticleIcon />
                  <Link href="/">
                    <h1>Docs</h1>
                  </Link>
                </div>

                <div className="flex flex-row gap-5">
                  <HelpIcon />
                  <Link href="/">
                    <h1>Help</h1>
                  </Link>
                </div>
                {/* Add here your custom menu elements */}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
