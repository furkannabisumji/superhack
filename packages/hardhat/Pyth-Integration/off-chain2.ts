// ማኔ ቴቄል ፋሬስ (Богатство Троица), [8/7/24 9:38 PM]
// // src/hermesClient.ts
// import { PriceServiceConnection } from "@pythnetwork/pyth-sdk-ts";

// const HERMES_BASE_URL = "https://hermes.pyth.network";

// const priceIds = [
//     // You can find the IDs of prices at https://pyth.network/developers/price-feed-ids
//  "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43", // BTC/USD price id
//  "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace", // ETH/USD price id
//  "0x7f5cc8d963fc5b3d2ae41fe5685ada89fd4f14b435f8050f28c7fd409f40c2d8", // ETC/USD price id
//  "0xc96458d393fe9deb7a7d63a0ac41e2898a67a7750dbd166673279e06c868df0a", // ETH/BTC price id
//  "0x7d669ddcdd23d9ef1fa9a9cc022ba055ec900e91c4cb960f3c20429d4447a411", // CELO/USD price id
//  "0x5de33a9112c2b700b8d30b8a3402c103578ccfa2765696471cc672bd5cf6ac52", // MATIC/USD price id
//  "0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d", // SOL/USD price id
//  "0x8963217838ab4cf5cadc172203c1f0b763fbaa45f346d8ee50ba994bbcac3026", // TON/USD price id
//  "0xdcef50dd0a4cd2dcc17e45df1676dcb336a11a61c69df7a0299b0150c672d25c", // DOGE/USD price id
//  ]

// export async function fetchPriceUpdates() {
//   const connection = new PriceServiceConnection(HERMES_BASE_URL, {
//     priceFeedRequestConfig: {
//       binary: true,
//     },
//   });

//   const priceUpdates = await connection.getLatestVaas(priceIds);
//   return priceUpdates;
// }

// ማኔ ቴቄል ፋሬስ (Богатство Троица), [8/7/24 9:38 PM]
// // scripts/updateOnChainPrices.ts
// import { ethers } from "ethers";
// import { fetchPriceUpdates } from "../src/hermesClient";

// async function updateOnChainPrices() {
//   // Fetch the latest price updates from Hermes
//   const priceUpdates = await fetchPriceUpdates();

//   // Prepare the provider and signer (adjust based on your environment)
//   const provider = new ethers.providers.Web3Provider((window as any).ethereum);
//   const signer = provider.getSigner();

//   // Contract details
//   const contractAddress = "0xYourContractAddressHere";
//   const contractABI = [
//     // ABI of your ExampleContract
//     // Ensure this ABI matches the ExampleContract
//   ];

//   // Initialize the contract
//   const pythContract = new ethers.Contract(contractAddress, contractABI, signer);

//   // Calculate the required fee
//   const fee = await pythContract.getUpdateFee(priceUpdates);

//   // Submit the price updates to the Pyth contract
//   const tx = await pythContract.updatePriceFeeds(priceUpdates, {
//     value: fee,
//   });

//   // Wait for the transaction to be mined
//   await tx.wait();

//   console.log("Price updates submitted successfully");
// }

// updateOnChainPrices().catch((error) => {
//   console.error("Failed to update prices:", error);
// });