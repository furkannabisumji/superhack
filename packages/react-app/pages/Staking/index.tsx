import React, { FormEvent, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { Contract, ethers } from "ethers";
import LeftSide from "@/components/refactors/leftSide";
import RightSide from "@/components/refactors/rightSide";

const Staking = () => {
  const contractABI = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "stake",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawStake",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "user",
          type: "address",
        },
      ],
      name: "calculateRewards",
      outputs: [{}],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);

  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [stakeBalance, setStakeBalance] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [apyRate, setApyRate] = useState(20);
  const [lockPeriod, setLockPeriod] = useState(7 * 24 * 60 * 60);
  const [lockEndTime, setLockEndTime] = useState(null);

  const formatTime = (seconds: number) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${d}d ${h}h ${m}m ${s}s`;
  };

  const timeLeft = lockEndTime
    ? lockEndTime - Math.floor(Date.now() / 1000)
    : 0;

  return (
    <div className="flex flex-row mt-10">
      <LeftSide />
      <div className="md:ml-56 bg-white md:mx-auto px-10 rounded shadow-xl w-full md:w-full overflow-hidden ">
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
          <div className="flex flex-col gap-5">
            <h1>Lock down Period</h1>
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
          <div className="flex md:w-1/2 px-3 py-3 md:flex-row md:gap-5 gap-2 border border-gray-500 rounded-lg ">
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

                <button className="orange_gradient mb-6 rounded-full border border-gray-500 py-1.5 px-5">
                  Claim
                </button>

                <button
                  //  onClick={handleStake}
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
                <button
                  //  href="/"
                  className="orange_gradient mb-6 rounded-full border border-slate-500 py-1.5 px-5"
                >
                  Claim
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-row md:w-1/2 px-3 py-3 md:flex-row md:gap-5 border border-gray-500 rounded-lg ">
            <h2 className="text-2xl font-semibold mb-2">Lock down Period</h2>
            <p>{formatTime(timeLeft) as unknown as String}</p>
          </div>
        </div>
      </div>
      <RightSide />
    </div>
  );
};

export default Staking;
