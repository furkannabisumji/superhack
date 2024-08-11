import UserCard from "../userCard";

type Props = {};

function RightSide({}: Props) {
  return (
    <div className="fixed hidden right-10 -mt-20 md:flex md:flex-col gap-10 w-1/5">
      {/* fetches users on the platform */}

      <div className="p-3 bg-white rounded-xl">
        <div className="flex flex-col gap-5 p-3 bg-slate-100 rounded-xl">
          <div className="text-2xl text-gray-500">Suggested</div>

          <UserCard
            userName="user"
            onUserClick={() => {}}
            onFollowButtonClick={() => {}}
          />
          <UserCard
            userName="user"
            onUserClick={() => {}}
            onFollowButtonClick={() => {}}
          />
          <UserCard
            userName="user"
            onUserClick={() => {}}
            onFollowButtonClick={() => {}}
          />
        </div>
      </div>

      <div className="p-3 bg-white rounded-xl">
        <div className="shadow-md mx-auto text-gray-500 p-3 bg-slate-100 rounded-xl">
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
              <span className="text-green-500 font-semibold">1000 Points</span>
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
              <span className="text-green-500 font-semibold">950 Points</span>
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
              <span className="text-green-500 font-semibold">850 Points</span>
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
              <span className="text-green-500 font-semibold">800 Points</span>
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
              <span className="text-green-500 font-semibold">750 Points</span>
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
              <span className="text-green-500 font-semibold">750 Points</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RightSide;
