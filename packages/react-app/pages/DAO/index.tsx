import { Chip, LinearProgress } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { Contract, ethers } from "ethers";
import LeftSide from "@/components/refactors/leftSide";
import RightSide from "@/components/refactors/rightSide";

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

type Props = {};

interface Proposal {
  id: number;
  description: string;
  initiator: string;
  timestamp: any;
}

const DAO = () => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  // const [_description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [error, setError] = useState("");

  const [description, setDescription] = useState<string>("");
  const [proposals, setProposals] = useState<Proposal[]>([]);

  const [_newOwner, setNewOwner] = useState("");

  const contractABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      stateMutability: "payable",
      type: "fallback",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_pId",
          type: "uint256",
        },
        {
          internalType: "enum Governance.VoteState",
          name: "_voteState",
          type: "uint8",
        },
      ],
      name: "approveProposal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "claimOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllProposals",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "initiator",
              type: "address",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
            {
              components: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
                {
                  internalType: "enum Governance.VoteState",
                  name: "vote",
                  type: "uint8",
                },
              ],
              internalType: "struct Governance.Vote[]",
              name: "votes",
              type: "tuple[]",
            },
          ],
          internalType: "struct Governance.Proposal[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_description",
          type: "string",
        },
      ],
      name: "initiateProposal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_newOwner",
          type: "address",
        },
      ],
      name: "transferOwnerShip",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ];

  // Function to initialize the contract
  useEffect(() => {
    const init = async () => {
      // First, let's make sure the user has MetaMask installed
      if (typeof window.ethereum !== "undefined") {
        // Use MetaMask's provider
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          "0xe4EB01021211D57c6f2a5940232301833A850d5d",
          contractABI,
          await signer
        );

        setProvider(provider);
        setSigner(await signer);
        setContract(contract);
        // console.log();
      } else {
        console.log("Please install MetaMask to interact with this app.");
      }
    };

    init();
    // fetchProposal();
  }, []);

  const fetchProposal = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0xe4EB01021211D57c6f2a5940232301833A850d5d",
        contractABI,
        await signer
      );

      const proposalsData = await contract.getAllProposals();
      const proposalsList: Proposal[] = proposalsData.map(
        (proposal: any, index: number) => ({
          id: index,
          initiator: proposal.initiator,
          description: proposal.description,
          time: proposal.timestamp,
        })
      );
      setProposals(proposalsList);
      console.log(proposalsList);
    } catch (err) {
      console.error("Error fetching proposals:", err);
      setError("Failed to fetch proposals");
    }
  };

  // const transferOwnerShip = async (event: FormEvent) => {
  //   event.preventDefault();

  //   // Reset any previous errors or transaction hashes
  //   setError("");
  //   setTransactionHash("");
  //   setLoading(true);

  //   try {
  //     const provider = new ethers.BrowserProvider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(
  //       "0xe4EB01021211D57c6f2a5940232301833A850d5d",
  //       contractABI,
  //       await signer
  //     );
  //     const tx = await contract.initiateProposal(_newOwner);

  //     const reciept = await tx.wait();

  //     setTransactionHash(reciept.transactionHash);

  //     console.log(reciept.transactionHash);
  //   } catch (err) {
  //     console.error("Error submitting proposal:", err);
  //     setError("Failed to submit proposal");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const claimOwnerShip = async (event: { preventDefault: () => void }) => {
  //   event.preventDefault();

  //   // Reset any previous errors or transaction hashes
  //   setError("");
  //   setTransactionHash("");
  //   setLoading(true);

  //   try {
  //     const provider = new ethers.BrowserProvider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(
  //       "0xe4EB01021211D57c6f2a5940232301833A850d5d",
  //       contractABI,
  //       await signer
  //     );
  //     const tx = await contract.claimOwnership();

  //     const reciept = await tx.wait();

  //     setTransactionHash(reciept.transactionHash);

  //     console.log(reciept.transactionHash);
  //   } catch (err) {
  //     console.error("Error claiming:", err);
  //     setError("Failed to claim ownership");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Reset any previous errors or transaction hashes
    setError("");
    setTransactionHash("");
    setLoading(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        "0xe4EB01021211D57c6f2a5940232301833A850d5d",
        contractABI,
        await signer
      );
      // const tx = await contract.initiateProposal(_description);

      // const reciept = await tx.wait();

      // setTransactionHash(reciept.transactionHash);

      // console.log(reciept.transactionHash);
    } catch (err) {
      console.error("Error submitting proposal:", err);
      setError("Failed to submit proposal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row bg-white md:mx-auto rounded shadow-xl w-full md:w-3/6 overflow-hidden mt-10">
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              // transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Create post
                      </DialogTitle>
                      <div className="mt-2">
                        <form>
                          <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                              <div className="mt-10 flex flex-col ">
                                <div className="col-span-full">
                                  <label
                                    htmlFor="about"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    post
                                  </label>
                                  <div className="mt-2 w-full">
                                    <textarea
                                      id="_description"
                                      name="about"
                                      rows={3}
                                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      // value={_description}
                                      onChange={(e) =>
                                        setDescription(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex gap-2 sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="rounded-full border border-slate-500 bg-slate-500 py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-slate-500 bg-white  py-1.5 px-5 text-black transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <Dialog open={open2} onClose={setOpen2} className="relative z-10">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              // transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <form
              // onSubmit={transferOwnerShip}
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        new Owner
                      </DialogTitle>
                      <div className="mt-2">
                        <form>
                          <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                              <div className="mt-10 flex flex-col ">
                                <div className="col-span-full">
                                  <label
                                    htmlFor="about"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    new Owner
                                  </label>
                                  <div className="mt-2 w-full">
                                    <textarea
                                      id="_description"
                                      name="about"
                                      rows={3}
                                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      // value={_description}
                                      onChange={(e) =>
                                        setNewOwner(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex gap-2 sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="rounded-full border border-slate-500 bg-slate-500 py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen2(false)}
                    className="rounded-full border border-slate-500 bg-white  py-1.5 px-5 text-black transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <LeftSide />

      <div className=" bg-white">
        <div className="flex flex-col gap-10 px-1 py-3 md:p-10 justify-between">
          <div className="flex flex-row gap-1 justify-between">
            <h1 className="md:text-3xl text-md">Our Governance</h1>
            <button
              // onClick={claimOwnerShip}
              className="rounded-full border border-slate-500 bg-slate-500 py-1.5 px-2 md:px-5 text-white transition-all hover:bg-white hover:text-black text-center text-xs md:text-sm font-inter flex items-center justify-center"
            >
              Claim Ownership
            </button>
            <button
              onClick={() => setOpen(true)}
              className="rounded-full border border-slate-500 bg-black py-1.5 px-2 md:px-5 text-white transition-all hover:bg-white hover:text-black text-center text-xs md:text-sm font-inter flex items-center justify-center"
            >
              Create A Proposal
            </button>
            <button
              onClick={() => setOpen2(true)}
              className="rounded-full border border-slate-500 bg-black py-1.5 px-2 md:px-5 text-white transition-all hover:bg-white hover:text-black text-center text-xs md:text-sm font-inter flex items-center justify-center"
            >
              transfer
            </button>
          </div>

          <div className="text-sm">
            <p>
              {}
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

          <div className="flex flex-col break-inside py-2 px-5 rounded-xl bg-white dark:bg-slate-100 bg-clip-border">
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
                  <button
                    onClick={() => {}}
                    className="rounded-full border border-green-bg-green-400 bg-green-500 py-1.5 px-5 text-white transition-all text-center text-xs font-inter flex items-center justify-center"
                  >
                    Let's do it
                  </button>
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
                  <button
                    onClick={() => {}}
                    className="rounded-full border border-red-500 bg-red-border-red-500 py-1.5 px-5 text-black transition-all text-center text-xs font-inter flex items-center justify-center"
                  >
                    No way
                  </button>
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
          <div className="flex flex-col break-inside py-2 px-5 rounded-xl bg-white dark:bg-slate-100 bg-clip-border">
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
                  <button
                    onClick={() => {}}
                    className="rounded-full border border-green-bg-green-400 bg-green-500 py-1.5 px-5 text-white transition-all  text-center text-xs font-inter flex items-center justify-center"
                  >
                    Let's do it
                  </button>
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
                  <button
                    onClick={() => {}}
                    className="rounded-full border border-red-500 bg-red-border-red-500 py-1.5 px-5 text-black transition-all  text-center text-xs font-inter flex items-center justify-center"
                  >
                    No way
                  </button>
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
      <RightSide />
    </div>
  );
};

export default DAO;
