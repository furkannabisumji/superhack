import PostCard from "@/components/PostCard";
import UserCard from "@/components/userCard";
import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
} from "@worldcoin/idkit";
import { SetStateAction, useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSocialConnect } from "@/SocialConnect/useSocialConnect";
import Image from "next/image";

import HubIcon from "@mui/icons-material/Hub";
import HttpsIcon from "@mui/icons-material/Https";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import CreatePost from "@/components/CreatePost";
import { Dialog, DialogTitle } from "@mui/material";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import ProfileCard from "@/components/profileCard";
import SideBarCard from "@/components/sideBarCard";
import LeftSide from "@/components/refactors/leftSide";
import RightSide from "@/components/refactors/rightSide";

export default function Home() {
  // const [account] = useState([]);

  // uncomment the line below and comment the line above to see the sign up page

  const [account, setAccount] = useState<boolean>();

  // const { account } = useSocialConnect();

  const [activeIndex, setactiveIndex] = useState(1);
  const handleClick = (index: SetStateAction<number>) => setactiveIndex(index);
  const checkActive = (index: number, className: any) =>
    activeIndex === index ? className : "";

  // modal
  const [open, setOpen] = useState(false);
  const handleClose = (value: string) => {
    setOpen(false);
  };

  // second modal
  const [modal2Open, setModal2Open] = useState(false);
  const handleModal2Close = (value: string) => {
    setModal2Open(false);
  };

  const { connect, isSuccess } = useConnect();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      setModal2Open(true);
    }
  }, [isSuccess]);

  // worldId functions

  const handleVerify = async (proof: ISuccessResult) => {
    const res = await fetch("/api/auth/verify", {
      // route to your backend will depend on implementation
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proof),
    });
    if (!res.ok) {
      throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
    } else {
      setAccount(true);
      setOpen(true);
    }
  };

  const onSuccess = () => {
    // This is where you should perform any actions after the modal is closed
    // Such as redirecting the user to a new page
  };

  return (
    <main className="flex flex-col mt-10 md:px-10 h-screen">
      {!account ? (
        <div className="flex flex-col md:flex-row gap-10 overflow-hidden ">
          {/* left */}
          <div className="bg-white p-10 md:w-1/4 rounded-xl flex flex-col gap-20 shadow-xl">
            <div>
              <h1 className="md:text-3xl sm:text-lg font-semibold text-black">
                Connect with your audience
              </h1>
            </div>
            <IDKitWidget
              app_id="app_staging_a16f3f6d0fc113a7bf1c2f31a20c3020" // obtained from the Developer Portal
              action="hack" // obtained from the Developer Portal
              onSuccess={onSuccess} // callback when the modal is closed
              handleVerify={handleVerify} // callback when the proof is received
              verification_level={VerificationLevel.Device}
            >
              {({ open }) => (
                // This is the button that will open the IDKit modal
                <button
                  className="rounded-full border  bg-black text-white p-3  md:py-1.5 md:px-5 transition-all text-center text-sm md:text-sm font-inter flex items-center justify-center"
                  onClick={open}
                >
                  Sign In with World ID
                </button>
              )}
            </IDKitWidget>
          </div>
          {/* right */}
          <div className="bg-white p-10 md:w-3/4 rounded-xl flex flex-col justify-between gap-20 text-black shadow-2xl">
            <div className="flex md:flex-row flex-col gap-20">
              <div className="flex flex-col gap-10 justify-between">
                <div className="flex flex-col gap-3">
                  <div>
                    <HubIcon height={160} width={160} />
                  </div>

                  <p className="text-xl">
                    A hub for web3 creators to socialize
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <HttpsIcon height={160} width={160} />
                  </div>

                  <p className="text-xl">
                    Authenticated with world ID to ensure Transparency
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-10 justify-between">
                <div className="flex flex-col gap-3">
                  <div>
                    <LocalGroceryStoreIcon height={160} width={160} />
                  </div>

                  <p className="text-xl">
                    A marketplace to sell and purchase NFTs
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <CurrencyBitcoinIcon height={160} width={160} />
                  </div>

                  <p className="text-xl">Get updates on Crypto News and more</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex md:flex-row flex-col gap-20 relative">
          <Dialog onClose={handleClose} open={open} className="">
            <DialogTitle className="md:text-3xl sm:text-lg font-semibold text-black">
              Connect Wallet
            </DialogTitle>
            <div className="flex flex-col gap-5 p-5 mt-2 w-[200px]">
              <p className="text-lg">
                Connect your wallet for a better experience!
              </p>
              <button
                className="rounded-full border  bg-black text-white p-3  md:py-1.5 md:px-5 transition-all text-center text-sm md:text-sm font-inter flex items-center justify-center"
                onClick={() =>
                  connect({ connector: injected({ target: "metaMask" }) })
                }
              >
                Connect
              </button>
            </div>
          </Dialog>

          <Dialog onClose={handleModal2Close} open={modal2Open}>
            <DialogTitle className="md:text-2xl sm:text-lg font-semibold text-black">
              Set up your user name
            </DialogTitle>
            <div className="flex flex-col gap-2 p-5 mt-2">
              <input
                id="username"
                name="username"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
              />

              <button
                type="button"
                data-autofocus
                onClick={() => {
                  // back end done here
                  setModal2Open(false);
                }}
                className="rounded-full border  bg-black text-white p-3  md:py-1.5 md:px-5 transition-all text-center text-sm md:text-sm font-inter flex items-center justify-center"
              >
                Continue to App
              </button>
            </div>
          </Dialog>
          {/* left panel */}
          <LeftSide />
          {/* feed */}

          {/* fetches available posts */}
          <div className="flex flex-col gap-5 md:gap-10 w-full px-2 py-2 md:w-4/5 ml-0 md:ml-56">
            <div className="flex flex-row justify-between -mt-16  md:-mt-16 bg-white border rounded-xl p-1 md:p-3">
              <div className="flex flex-row gap-3 md:gap-5">
                <button
                  className={`tab ${checkActive(1, "active")}`}
                  onClick={() => handleClick(1)}
                >
                  Feed
                </button>
                <button
                  className={`tab ${checkActive(2, "active")}`}
                  onClick={() => handleClick(2)}
                >
                  Following
                </button>
                <button
                  className={`tab ${checkActive(3, "active")}`}
                  onClick={() => handleClick(3)}
                >
                  Subscribed
                </button>
              </div>

              <div>
                <CreatePost
                  post={""}
                  likes={0}
                  comments={[]}
                  onCreatePostClick={() => {}}
                />
              </div>
            </div>

            <div className={`pageContent ${checkActive(1, "active")}`}>
              {/* Posts go here */}
              <PostCard
                userName={""}
                text={""}
                onUserClick={() => {}}
                onCommentSendClick={() => {}}
                onLikeClick={() => {}}
              />
            </div>

            <div className={`pageContent ${checkActive(2, "active")}`}>
              {/* Posts from people user follows go here */}
              <p>2</p>
            </div>

            <div className={`pageContent ${checkActive(3, "active")}`}>
              {/* Posts from people user subscribed to go here */}
              <p>3</p>
            </div>
          </div>

          {/* right panel */}
          <RightSide />
        </div>
      )}
    </main>
  );
}
