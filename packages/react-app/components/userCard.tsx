import Link from "next/link";

type Props = {
  userName: string;
  onUserClick: () => void;
  onFollowButtonClick: () => void;
  className?: string;
  style?: string;
};

function UserCard({
  userName,
  onUserClick,
  onFollowButtonClick,
  className = "",
  style = "",
}: Props) {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex items-center justify-between">
        <div className="flex">
          <a className="inline-block mr-4" href="/profile">
            <img
              className="rounded-full max-w-none w-8 h-8"
              src="https://randomuser.me/api/portraits/women/9.jpg"
            />
          </a>
          <div className="flex flex-col">
            <div className="flex items-center">
              <a
                className="inline-block text-xs font-bold mr-2"
                href="/profile"
              >
                Esther Howard
              </a>
              <span>
                <svg
                  className="fill-blue-500 dark:fill-slate-50 w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <Link
        href="/"
        className="rounded-full border border-slate-500 bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
      >
        Follow
      </Link>
    </div>
  );
}

export default UserCard;
