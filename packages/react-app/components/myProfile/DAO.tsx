import { Chip, LinearProgress } from "@mui/material";
import Link from "next/link";

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Governance from '../artifacts/contracts/Governance.sol/Governance.json';
// import Governance from '../../hardhat/artifacts/contracts/Governance.sol/Governance.json'; // Update the path as necessary


type Props = {};

function DAO({}: Props) {

  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);

   // Function to initialize the contract
   useEffect(() => {
    const init = async () => {
      // First, let's make sure the user has MetaMask installed
      if (typeof window.ethereum !== 'undefined') {
        // Use MetaMask's provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          'Your_Contract_Address', // Replace with your contract's address
          Governance.abi,
          signer
        );
        
        setProvider(provider);
        setSigner(signer);
        setContract(contract);
      } else {
        console.log("Please install MetaMask to interact with this app.");
      }
    };

    init();
  }, []);


  return (
    <div className="bg-white md:mx-auto rounded shadow-xl w-full md:w-2/3 overflow-hidden -mt-10">
      <div className="h-screen bg-gradient-to-r from-slate-400 to-slate-500">
        <div className="flex flex-col gap-10 px-10 py-10 justify-between">
          <h1 className="text-3xl">Our Governance</h1>
          <div className="text-sm">
            <p>
              Following the request for proposal (RFP) from NEW (Network
              Expansion WorkGroup) that concluded on Decemeber 5th, 2023 there
              are 4 eligible submissions to developer wstEth brige on BNB
              recieved postivie or neutral feedback from the community. This
              vote will identify the most supported team among the eligible
              competing submissions whose references given below to kick off or
              continue development.
            </p>

            <div className="flex flex-col gap-2">
              <h2>Voting conditions</h2>
              <p>
                This vote will requires a quoroum of 5% LDO total supply (50M)
                votes for any single option . The winning submission will be
                determined based on two conditions.
              </p>
              <ul>
                <li>
                  1. a quoroum of 50% in total accross all options is reached.
                </li>
                <li>
                  2. The leading option must exceed the second candidate by a
                  margin of 20% of votes participated in the vote
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col break-inside py-2 px-5 rounded-xl bg-white dark:bg-slate-800 bg-clip-border">
            <div className="flex flex-row justify-between items-center">
              {/* left */}

              <div className="flex flex-col gap-2">
                <h2 className="p-3">Proposal 1</h2>

                <Chip
                  label="Passed"
                  variant="outlined"
                  size="small"
                  className="text-[11px] p-2 text-green-400 border-green-400"
                />
              </div>

              {/* right */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                  <Link
                    href="/"
                    className="rounded-full border border-green-bg-green-400 bg-green-500 py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-xs font-inter flex items-center justify-center"
                  >
                    Let's do it
                  </Link>
                  <div className="flex flex-col">
                    <h2>50%</h2>
                    <LinearProgress
                      color="success"
                      variant="determinate"
                      value={50}
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-2">
                  <Link
                    href="/"
                    className="rounded-full border border-red-500 bg-red-border-red-500 py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-xs font-inter flex items-center justify-center"
                  >
                    No way
                  </Link>
                  <div className="flex flex-col">
                    <h2>50%</h2>
                    <LinearProgress
                      color="error"
                      variant="determinate"
                      value={50}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col break-inside py-2 px-5 rounded-xl bg-white dark:bg-slate-800 bg-clip-border">
            <div className="flex flex-row justify-between items-center">
              {/* left */}

              <div className="flex flex-col gap-2">
                <h2 className="p-3">Proposal 2</h2>

                <Chip
                  label="Passed"
                  variant="outlined"
                  size="small"
                  className="text-[11px] p-2 text-green-400 border-green-400"
                />
              </div>

              {/* right */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                  <Link
                    href="/"
                    className="rounded-full border border-green-bg-green-400 bg-green-500 py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-xs font-inter flex items-center justify-center"
                  >
                    Let's do it
                  </Link>
                  <div className="flex flex-col">
                    <h2>50%</h2>
                    <LinearProgress
                      color="success"
                      variant="determinate"
                      value={50}
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-2">
                  <Link
                    href="/"
                    className="rounded-full border border-red-500 bg-red-border-red-500 py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-xs font-inter flex items-center justify-center"
                  >
                    No way
                  </Link>
                  <div className="flex flex-col">
                    <h2>50%</h2>
                    <LinearProgress
                      color="error"
                      variant="determinate"
                      value={50}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DAO;
