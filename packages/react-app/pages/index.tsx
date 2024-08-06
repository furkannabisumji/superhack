import PostCard from "@/components/PostCard";
import UserCard from "@/components/userCard";
import { SetStateAction, useEffect, useState } from "react";
import { useSocialConnect } from "@/SocialConnect/useSocialConnect";

export default function Home() {
  const [account] = useState([]);

  // const { account } = useSocialConnect();

  const [activeIndex, setactiveIndex] = useState(1);
  const handleClick = (index: SetStateAction<number>) => setactiveIndex(index);
  const checkActive = (index: number, className: any) =>
    activeIndex === index ? className : "";

  return (
    <main className="flex flex-col mt-10 px-10">
      {!account ? (
        "Connect your wallet to use SocialConnect"
      ) : (
        <div className="flex flex-row gap-20 relative">
          {/* left panel */}

          {/* fetches users on the platform */}
          <div className="flex flex-col gap-10 w-1/6 min-h-screen fixed top-32 left-5 bottom-0 border-r-2 pr-2 border-white">
            <div className="text-2xl text-white">Suggested</div>

            <UserCard />
            <UserCard />
            <UserCard />
          </div>

          {/* feed */}

          {/* fetches available posts */}
          <div className="flex flex-col gap-10 w-3/5 ml-56">
            <div className="flex flex-row gap-5 fixed left-0 -mt-16 bg-slate-500 border border-slate-500 rounded-t-none rounded-xl p-3">
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

            <div className={`pageContent ${checkActive(1, "active")}`}>
              {/* Posts go here */}
              <PostCard />
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

          {/* live crypto data */}

          <div className="flex flex-col gap-10 w-1/5">
            <div className="shadow-md rounded-md mx-auto max-w-sm6 text-white">
              <h2 className="text-xl font-semibold mb-4 ">Top Crypto</h2>
              <ul>
                <li className="flex items-center justify-between py-2 border-b border-gray-300">
                  <div className="flex items-center">
                    <span className="text-lg font-semibold mr-4">1</span>
                    <img
                      src="https://via.placeholder.com/48"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full mr-4"
                    />
                    <span className="font-semibold">BitCoin</span>
                  </div>
                  <span className="text-green-500 font-semibold">
                    1000 Points
                  </span>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-gray-300">
                  <div className="flex items-center">
                    <span className="text-lg font-semibold mr-4">2</span>
                    <img
                      src="https://via.placeholder.com/48"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full mr-4"
                    />
                    <span className=" font-semibold">ETH</span>
                  </div>
                  <span className="text-green-500 font-semibold">
                    950 Points
                  </span>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-gray-300">
                  <div className="flex items-center">
                    <span className="text-lg font-semibold mr-4">3</span>
                    <img
                      src="https://via.placeholder.com/48"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full mr-4"
                    />
                    <span className=" font-semibold">Tether</span>
                  </div>
                  <span className="text-green-500 font-semibold">
                    850 Points
                  </span>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-gray-300">
                  <div className="flex items-center">
                    <span className="text-lg font-semibold mr-4">4</span>
                    <img
                      src="https://via.placeholder.com/48"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full mr-4"
                    />
                    <span className=" font-semibold">USD</span>
                  </div>
                  <span className="text-green-500 font-semibold">
                    800 Points
                  </span>
                </li>
                <li className="flex items-center justify-between gap-2 py-2">
                  <div className="flex items-center">
                    <span className="text-lg font-semibold mr-4">5</span>
                    <img
                      src="https://via.placeholder.com/48"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full mr-4"
                    />
                    <span className=" font-semibold">Binance</span>
                  </div>
                  <span className="text-green-500 font-semibold">
                    750 Points
                  </span>
                </li>
                <li className="flex items-center justify-between gap-2 py-2">
                  <div className="flex items-center">
                    <span className="text-lg font-semibold mr-4">6</span>
                    <img
                      src="https://via.placeholder.com/48"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full mr-4"
                    />
                    <span className=" font-semibold">Solana</span>
                  </div>
                  <span className="text-green-500 font-semibold">
                    750 Points
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
