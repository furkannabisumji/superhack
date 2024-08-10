import Link from "next/link";

type Props = {};

function ProfileCard({}: Props) {
  return (
    <div className="p-3 bg-white rounded-xl ">
      <div className="flex flex-col p-3 bg-slate-100 rounded-xl">
        <div className="flex flex-row gap-2">
          {/* avatar */}
          <div className="flex -space-x-1 overflow-hidden">
            <img
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <Link href="my-profile">
              <h1 className="text-xl font-bold">Address</h1>
            </Link>

            <p className="text-xs font-light text-gray-500">@userName</p>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold">2K</h1>
            <p className="text-xs font-light text-gray-500">Follower</p>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold">235</h1>
            <p className="text-xs font-light text-gray-500">Following</p>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold">80</h1>
            <p className="text-sm font-light text-gray-500">Post</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
