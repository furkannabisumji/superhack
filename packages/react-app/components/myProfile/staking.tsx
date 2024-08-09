import Link from "next/link";
import { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

type Props = {};

function Staking({}: Props) {
  const [rewards, setRewards] = useState(0);
  const [stakeBalance, setStakeBalance] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [apyRate, setApyRate] = useState(20); // Example APY rate
  const [lockPeriod, setLockPeriod] = useState(7 * 24 * 60 * 60); // 7 days in seconds
  const [lockEndTime, setLockEndTime] = useState(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");

  const handleStake = async () => {};

  const handleUnstake = async () => {};

  const formatTime = (seconds: number) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    // return { d };
    // d, { h };
    // h, { m };
    // m, { s };
    // s;
  };

  const timeLeft = lockEndTime
    ? lockEndTime - Math.floor(Date.now() / 1000)
    : 0;

  return (
    <div className="md:mx-auto px-10 rounded shadow-xl w-full md:w-2/3 overflow-hidden ">
      <h1 className=" text-3xl font-bold mb-6">Staking</h1>
      <div className="flex flex-row gap-10">
        <div>
          <p>Staked Balance: {stakeBalance} Tokens</p>
          <p>Rewards: {rewards} Tokens</p>
        </div>
        <div className="flex md:flex-row flex-col md:gap-10 md:mb-5 mb-2">
          <div className="flex flex-col md:min-w-32 gap-2 border bg-slate-500 text-[12px] text-white rounded-xl px-4 py-2">
            <h2>Total value locked</h2>
            <h1>{totalStaked} Tokens</h1>
          </div>
          {/* <div className="flex flex-col md:min-w-32 gap-2 border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 text-[12px] text-white rounded-xl px-4 py-2">
          <h2>Points generated</h2>
        </div> */}
          <div className="flex flex-col md:min-w-32 gap-2 border bg-slate-500  text-[12px] text-white rounded-xl px-4 py-2">
            <h2>APY Rate</h2>
            <h1>{apyRate}%</h1>
          </div>
          {/* <div className="flex flex-col md:min-w-32 gap-2 border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 text-[12px] text-white rounded-xl px-4 py-2">
          <h2>stakers</h2>
          <h1>9,574</h1>
        </div> */}
        </div>
      </div>

      <div className="flex flex-row gap-10 mb-10">
        <div className="border border-slate-300 rounded-lg grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span>15</span>
            </span>
            days
          </div>

          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span>10</span>
            </span>
            hours
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span>24</span>
            </span>
            min
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span>23</span>
            </span>
            sec
          </div>
        </div>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          height={300}
          margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
          grid={{ vertical: true, horizontal: true }}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex md:w-1/2 px-3 py-3 md:flex-row md:gap-5 gap-2 border border-orange-300 rounded-lg ">
          <div className="flex flex-col mb-6">
            <h2 className="text-2xl font-semibold mb-2">Stake Tokens</h2>
            <div className="flex flex-col p-4 border rounded-lg shadow-sm">
              <input
                type="number"
                placeholder="Enter amount to stake"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />

              <Link
                href="/"
                className="orange_gradient mb-6 rounded-full border border-orange-300 py-1.5 px-5"
              >
                Claim
              </Link>

              <button
                onClick={handleStake}
                className="border mt-6 bg-slate-500 rounded-3xl py-2 px-6 text-[12px] text-white"
              >
                Stake Tokens
              </button>
            </div>
          </div>

          <div className="flex flex-col mb-6">
            <h2 className="text-2xl font-semibold mb-2">Claim</h2>
            <div className="flex flex-col p-4 border rounded-lg shadow-sm">
              <input
                type="number"
                placeholder="Enter amount to unstake"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <Link
                href="/"
                className="orange_gradient mb-6 rounded-full border border-slate-500 py-1.5 px-5"
              >
                Claim
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-row md:w-1/2 px-3 py-3 md:flex-row md:gap-5 border border-orange-300 rounded-lg ">
          <h2 className="text-2xl font-semibold mb-2">Lock down Period</h2>
          <p>{formatTime(timeLeft) as unknown as String}</p>
        </div>
      </div>
    </div>
  );
}

export default Staking;
