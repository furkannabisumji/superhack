import Link from "next/link";
import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Typography, Button, TextField } from "@mui/material";
import { ethers } from "ethers";

// Define the provider and staking contract
const provider = new ethers.providers.JsonRpcProvider('YOUR_INFURA_OR_ALCHEMY_URL');
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const abi = [
  "function stake(uint256 amount) public",
  "function withdrawStake() public",
  "function claimRewards() public",
  "function getStake(address user) public view returns (uint256)",
  "event Staked(address indexed user, uint256 amount, uint256 timestamp, uint256 blockNumber)",
  "event Unstaked(address indexed user, uint256 amount, uint256 timestamp, uint256 blockNumber)",
  "event RewardClaimed(address indexed user, uint256 amount, uint256 timestamp, uint256 blockNumber)"
];
const stakingContract = new ethers.Contract(contractAddress, abi, provider);

const StakingPage = () => {
    const [stakeAmount, setStakeAmount] = useState("");
    const [unstakeAmount, setUnstakeAmount] = useState("");
    const [stakeBalance, setStakeBalance] = useState(0);
    const [rewards, setRewards] = useState(0);
    const [totalStaked, setTotalStaked] = useState(0);
    const [apyRate, setApyRate] = useState(20); // Example APY rate
    const [lockPeriod, setLockPeriod] = useState(7 * 24 * 60 * 60); // 7 days in seconds
    const [lockEndTime, setLockEndTime] = useState(null);

    // Define state for storing event data
    const [stakingData, setStakingData] = useState([]);
    const [unstakingData, setUnstakingData] = useState([]);
    const [rewardClaimedData, setRewardClaimedData] = useState([]);

    const [signer, setSigner] = useState(null);

    useEffect(() => {
        const setup = async () => {
            const { ethereum } = window;
            if (ethereum) {
                const userSigner = new ethers.providers.Web3Provider(ethereum).getSigner();
                setSigner(userSigner);
                const userAddress = await userSigner.getAddress();
                const stakeAmount = await stakingContract.getStake(userAddress);
                setStakeBalance(ethers.utils.formatUnits(stakeAmount, 18));
            }
        };
        setup();
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            const stakingFilter = stakingContract.filters.Staked();
            const unstakingFilter = stakingContract.filters.Unstaked();
            const rewardClaimedFilter = stakingContract.filters.RewardClaimed();

            const stakingEvents = await stakingContract.queryFilter(stakingFilter);
            const unstakingEvents = await stakingContract.queryFilter(unstakingFilter);
            const rewardClaimedEvents = await stakingContract.queryFilter(rewardClaimedFilter);

            setStakingData(stakingEvents.map(event => ({
                userAddress: event.args.user,
                amount: ethers.utils.formatUnits(event.args.amount, 18),
                timestamp: new Date(event.args.timestamp.toNumber() * 1000).toLocaleString(),
                blockNumber: event.args.blockNumber,
                blockScanLink: `https://etherscan.io/block/${event.args.blockNumber}`
            })));
            
            setUnstakingData(unstakingEvents.map(event => ({
                userAddress: event.args.user,
                amount: ethers.utils.formatUnits(event.args.amount, 18),
                timestamp: new Date(event.args.timestamp.toNumber() * 1000).toLocaleString(),
                blockNumber: event.args.blockNumber,
                blockScanLink: `https://etherscan.io/block/${event.args.blockNumber}`
            })));

            setRewardClaimedData(rewardClaimedEvents.map(event => ({
                userAddress: event.args.user,
                amount: ethers.utils.formatUnits(event.args.amount, 18),
                timestamp: new Date(event.args.timestamp.toNumber() * 1000).toLocaleString(),
                blockNumber: event.args.blockNumber,
                blockScanLink: `https://etherscan.io/block/${event.args.blockNumber}`
            })));
        };

        fetchEvents();
    }, []);

    const handleStake = async () => {
        if (!signer) return;
        const amount = ethers.utils.parseUnits(stakeAmount, 18);
        const contractWithSigner = stakingContract.connect(signer);

        try {
            const tx = await contractWithSigner.stake(amount);
            await tx.wait();
            alert("Staking successful!");
            setStakeAmount(""); // Clear the input
            const stakeAmount = await stakingContract.getStake(await signer.getAddress());
            setStakeBalance(ethers.utils.formatUnits(stakeAmount, 18));
        } catch (error) {
            console.error("Error staking tokens:", error);
            alert("Error staking tokens. Check the console for details.");
        }
    };

    const handleUnstake = async () => {
        if (!signer) return;
        const contractWithSigner = stakingContract.connect(signer);

        try {
            const tx = await contractWithSigner.withdrawStake();
            await tx.wait();
            alert("Unstaking successful!");
            setUnstakeAmount(""); // Clear the input
            const stakeAmount = await stakingContract.getStake(await signer.getAddress());
            setStakeBalance(ethers.utils.formatUnits(stakeAmount, 18));
        } catch (error) {
            console.error("Error unstaking tokens:", error);
            alert("Error unstaking tokens. Check the console for details.");
        }
    };

    const handleClaimRewards = async () => {
        if (!signer) return;
        const contractWithSigner = stakingContract.connect(signer);

        try {
            const tx = await contractWithSigner.claimRewards();
            await tx.wait();
            alert("Rewards claimed successfully!");
            setRewards(0); // Clear rewards
            const stakeAmount = await stakingContract.getStake(await signer.getAddress());
            setStakeBalance(ethers.utils.formatUnits(stakeAmount, 18));
        } catch (error) {
            console.error("Error claiming rewards:", error);
            alert("Error claiming rewards. Check the console for details.");
        }
    };

    const formatTime = (seconds) => {
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
        <div className="md:mx-auto px-10 rounded shadow-xl w-full md:w-2/3 overflow-hidden">
            <h1 className="text-3xl font-bold mb-6">Staking</h1>
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
                    <div className="flex flex-col md:min-w-32 gap-2 border bg-slate-500 text-[12px] text-white rounded-xl px-4 py-2">
                        <h2>APY Rate</h2>
                        <h1>{apyRate}%</h1>
                    </div>
                </div>
            </div>

            <div className="flex flex-row gap-10 mb-10">
                <div className="flex flex-col gap-5">
                    <h1>Lock down Period</h1>
                    <div className="border border-slate-300 rounded-lg grid grid-flow-col gap-5 text-center auto-cols-max">
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                            <span className="countdown font-mono text-5xl">
                                <span>{Math.floor(timeLeft / (3600 * 24))}</span>
                            </span>
                            days
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                            <span className="countdown font-mono text-5xl">
                                <span>{Math.floor((timeLeft % (3600 * 24)) / 3600)}</span>
                            </span>
                            hours
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                            <span className="countdown font-mono text-5xl">
                                <span>{Math.floor((timeLeft % 3600) / 60)}</span>
                            </span>
                            mins
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                            <span className="countdown font-mono text-5xl">
                                <span>{timeLeft % 60}</span>
                            </span>
                            secs
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:w-[40%] w-full gap-5">
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Staking
                            </Typography>
                            <TextField
                                label="Amount"
                                variant="outlined"
                                type="number"
                                value={stakeAmount}
                                onChange={(e) => setStakeAmount(e.target.value)}
                                fullWidth
                            />
                            <Button variant="contained" color="primary" onClick={handleStake} fullWidth>
                                Stake
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Unstaking
                            </Typography>
                            <TextField
                                label="Amount"
                                variant="outlined"
                                type="number"
                                value={unstakeAmount}
                                onChange={(e) => setUnstakeAmount(e.target.value)}
                                fullWidth
                            />
                            <Button variant="contained" color="primary" onClick={handleUnstake} fullWidth>
                                Unstake
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Claim Rewards
                            </Typography>
                            <Button variant="contained" color="primary" onClick={handleClaimRewards} fullWidth>
                                Claim
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Staking Activities</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User Address</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>Block Number</TableCell>
                            <TableCell>Block Scan Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stakingData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.userAddress}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                <TableCell>{row.timestamp}</TableCell>
                                <TableCell>{row.blockNumber}</TableCell>
                                <TableCell>
                                    <a href={row.blockScanLink} target="_blank" rel="noopener noreferrer">
                                        View Block
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <h2 className="text-2xl font-bold mt-10 mb-4">Unstaking Activities</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User Address</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>Block Number</TableCell>
                            <TableCell>Block Scan Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {unstakingData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.userAddress}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                <TableCell>{row.timestamp}</TableCell>
                                <TableCell>{row.blockNumber}</TableCell>
                                <TableCell>
                                    <a href={row.blockScanLink} target="_blank" rel="noopener noreferrer">
                                        View Block
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <h2 className="text-2xl font-bold mt-10 mb-4">Rewards Claimed Activities</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User Address</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>Block Number</TableCell>
                            <TableCell>Block Scan Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rewardClaimedData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.userAddress}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                <TableCell>{row.timestamp}</TableCell>
                                <TableCell>{row.blockNumber}</TableCell>
                                <TableCell>
                                    <a href={row.blockScanLink} target="_blank" rel="noopener noreferrer">
                                        View Block
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default StakingPage;







































// import Link from "next/link";
// import { useState } from "react";
// import { LineChart } from "@mui/x-charts/LineChart";

// type Props = {};

// function Staking({}: Props) {
//   const [rewards, setRewards] = useState(0);
//   const [stakeBalance, setStakeBalance] = useState(0);
//   const [totalStaked, setTotalStaked] = useState(0);
//   const [apyRate, setApyRate] = useState(20); // Example APY rate
//   const [lockPeriod, setLockPeriod] = useState(7 * 24 * 60 * 60); // 7 days in seconds
//   const [lockEndTime, setLockEndTime] = useState(null);
//   const [stakeAmount, setStakeAmount] = useState("");
//   const [unstakeAmount, setUnstakeAmount] = useState("");

//   const handleStake = async () => {};

//   const handleUnstake = async () => {};

//   const formatTime = (seconds: number) => {
//     const d = Math.floor(seconds / (3600 * 24));
//     const h = Math.floor((seconds % (3600 * 24)) / 3600);
//     const m = Math.floor((seconds % 3600) / 60);
//     const s = Math.floor(seconds % 60);
//     // return { d };
//     // d, { h };
//     // h, { m };
//     // m, { s };
//     // s;
//   };

//   const timeLeft = lockEndTime
//     ? lockEndTime - Math.floor(Date.now() / 1000)
//     : 0;

//   return (
//     <div className="md:mx-auto px-10 rounded shadow-xl w-full md:w-2/3 overflow-hidden ">
//       <h1 className=" text-3xl font-bold mb-6">Staking</h1>
//       <div className="flex flex-row gap-10">
//         <div>
//           <p>Staked Balance: {stakeBalance} Tokens</p>
//           <p>Rewards: {rewards} Tokens</p>
//         </div>
//         <div className="flex md:flex-row flex-col md:gap-10 md:mb-5 mb-2">
//           <div className="flex flex-col md:min-w-32 gap-2 border bg-slate-500 text-[12px] text-white rounded-xl px-4 py-2">
//             <h2>Total value locked</h2>
//             <h1>{totalStaked} Tokens</h1>
//           </div>
//           {/* <div className="flex flex-col md:min-w-32 gap-2 border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 text-[12px] text-white rounded-xl px-4 py-2">
//           <h2>Points generated</h2>
//         </div> */}
//           <div className="flex flex-col md:min-w-32 gap-2 border bg-slate-500  text-[12px] text-white rounded-xl px-4 py-2">
//             <h2>APY Rate</h2>
//             <h1>{apyRate}%</h1>
//           </div>
//           {/* <div className="flex flex-col md:min-w-32 gap-2 border bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 text-[12px] text-white rounded-xl px-4 py-2">
//           <h2>stakers</h2>
//           <h1>9,574</h1>
//         </div> */}
//         </div>
//       </div>

//       <div className="flex flex-row gap-10 mb-10">
//         <div className="flex flex-col gap-5">
//           <h1>Lock down Period</h1>
//           <div className="border border-slate-300 rounded-lg grid grid-flow-col gap-5 text-center auto-cols-max">
//             <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
//               <span className="countdown font-mono text-5xl">
//                 <span>15</span>
//               </span>
//               days
//             </div>

//             <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
//               <span className="countdown font-mono text-5xl">
//                 <span>10</span>
//               </span>
//               hours
//             </div>
//             <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
//               <span className="countdown font-mono text-5xl">
//                 <span>24</span>
//               </span>
//               min
//             </div>
//             <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
//               <span className="countdown font-mono text-5xl">
//                 <span>23</span>
//               </span>
//               sec
//             </div>
//           </div>
//         </div>

//         <LineChart
//           xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
//           series={[
//             {
//               data: [2, 5.5, 2, 8.5, 1.5, 5],
//             },
//           ]}
//           height={300}
//           margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
//           grid={{ vertical: true, horizontal: true }}
//         />
//       </div>

//       <div className="flex flex-col md:flex-row gap-5">
//         <div className="flex md:w-1/2 px-3 py-3 md:flex-row md:gap-5 gap-2 border border-orange-300 rounded-lg ">
//           <div className="flex flex-col mb-6">
//             <h2 className="text-2xl font-semibold mb-2">Stake Tokens</h2>
//             <div className="flex flex-col p-4 border rounded-lg shadow-sm">
//               <input
//                 type="number"
//                 placeholder="Enter amount to stake"
//                 value={stakeAmount}
//                 onChange={(e) => setStakeAmount(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded mb-4"
//               />

//               <Link
//                 href="/"
//                 className="orange_gradient mb-6 rounded-full border border-orange-300 py-1.5 px-5"
//               >
//                 Claim
//               </Link>

//               <button
//                 onClick={handleStake}
//                 className="border mt-6 bg-slate-500 rounded-3xl py-2 px-6 text-[12px] text-white"
//               >
//                 Stake Tokens
//               </button>
//             </div>
//           </div>

//           <div className="flex flex-col mb-6">
//             <h2 className="text-2xl font-semibold mb-2">Claim</h2>
//             <div className="flex flex-col p-4 border rounded-lg shadow-sm">
//               <input
//                 type="number"
//                 placeholder="Enter amount to unstake"
//                 value={unstakeAmount}
//                 onChange={(e) => setUnstakeAmount(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded mb-4"
//               />
//               <Link
//                 href="/"
//                 className="orange_gradient mb-6 rounded-full border border-slate-500 py-1.5 px-5"
//               >
//                 Claim
//               </Link>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-row md:w-1/2 px-3 py-3 md:flex-row md:gap-5 border border-orange-300 rounded-lg ">
//           <h2 className="text-2xl font-semibold mb-2">Lock down Period</h2>
//           <p>{formatTime(timeLeft) as unknown as String}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Staking;
