import PostCard from "@/components/PostCard";
import Link from "next/link";
import React, { SetStateAction, useState } from "react";

const Profile = () => {
  const [activeIndex, setactiveIndex] = useState(1);
  const handleClick = (index: SetStateAction<number>) => setactiveIndex(index);
  const checkActive = (index: number, className: any) =>
    activeIndex === index ? className : "";
  return (
    <div>
      <div className="bg-white md:mx-auto rounded shadow-xl w-full md:w-1/2 overflow-hidden -mt-10">
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
                {/* sends message through attestations */}

                <Link
                  href="/"
                  className="rounded-full border border-slate-500 bg-white  py-1.5 px-5 text-black transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
                >
                  Send Message
                </Link>

                {/* fund button goes to minipay */}
                <Link
                  href="/"
                  className="rounded-full border border-slate-500 bg-slate-500 py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
                >
                  Fund
                </Link>
              </div>
            </div>
          </div>

          <h4 className="text-md text-black font-medium leading-3">About</h4>
          <p className="text-sm text-stone-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere
            dolores aliquid sequi sunt iusto ipsum earum natus omnis asperiores
            architecto praesentium dignissimos pariatur, ipsa cum? Voluptate
            vero eius at voluptas?
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-5 bg-slate-500 border border-slate-500 rounded-xl p-3">
              <button
                className={`tab ${checkActive(1, "active")}`}
                onClick={() => handleClick(1)}
              >
                Posts
              </button>
              <button
                className={`tab ${checkActive(2, "active")}`}
                onClick={() => handleClick(2)}
              >
                Assets
              </button>
              <button
                className={`tab ${checkActive(3, "active")}`}
                onClick={() => handleClick(3)}
              >
                MarketPlace
              </button>
            </div>
            <div className={`pageContent ${checkActive(1, "active")}`}>
              <PostCard />
            </div>

            <div className={`pageContent ${checkActive(2, "active")}`}>
              <p>2</p>
            </div>

            <div className={`pageContent ${checkActive(3, "active")}`}>
              <p>3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
