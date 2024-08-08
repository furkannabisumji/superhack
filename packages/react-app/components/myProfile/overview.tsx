import Link from "next/link";

type Props = {};

function Overview({}: Props) {
  return (
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
          dolores aliquid sequi sunt iusto ipsum earum natus omnis asperiores
          architecto praesentium dignissimos pariatur, ipsa cum? Voluptate vero
          eius at voluptas?
        </p>
      </div>
    </div>
  );
}

export default Overview;
