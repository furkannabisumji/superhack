import express from "express";
import { verifyCloudProof } from "@worldcoin/idkit";
import {
  contract,
  contractAddresses,
  devAccount,
  pythContract,
  web3,
} from "../web3/web3Contracts.js";
import { upload } from "../clients/s3.js";
import {
  PriceServiceConnection,
  PriceFeed,
} from "@pythnetwork/price-service-client";

const router = express.Router();
router.post("/verify", async (req, res) => {
  try {
    const verifyRes = await verifyCloudProof(
      req.body,
      process.env.APP_ID,
      process.env.ACTION_ID
    );
    if (verifyRes.success) {
      const user = await contract.methods.getUser(req.body.address).call();
      if (user.username.length === 0) {
        const txData = contract.methods
          .registerUser(
            req.body.address,
            req.body.nullifier_hash,
            req.body.username
          )
          .encodeABI();
        const signedTx = await devAccount.signTransaction({
          from: devAccount.address,
          to: contractAddresses.social,
          data: txData,
          gasPrice: await web3.eth.getGasPrice(),
          gasLimit: "5190000",
        });
        await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      }
      return res.status(200).json({ status: "ok" });
    } else {
      return res.status(400).send(verifyRes);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    return res.json({ key: req.file });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/pyth", async (req, res) => {
  const connection = new PriceServiceConnection("https://hermes.pyth.network", {
    priceFeedRequestConfig: {
      // Retrieve binary price updates for on-chain contracts
      binary: true,
    },
  });

  // Define the price IDs you are interested in
  const priceIds = [
    "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43", // BTC/USD price id
    "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace", // ETH/USD price id
    "0x7f5cc8d963fc5b3d2ae41fe5685ada89fd4f14b435f8050f28c7fd409f40c2d8", // ETC/USD price id
    "0xc96458d393fe9deb7a7d63a0ac41e2898a67a7750dbd166673279e06c868df0a", // ETH/BTC price id
    "0x7d669ddcdd23d9ef1fa9a9cc022ba055ec900e91c4cb960f3c20429d4447a411", // CELO/USD price id
    "0x5de33a9112c2b700b8d30b8a3402c103578ccfa2765696471cc672bd5cf6ac52", // MATIC/USD price id
    "0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d", // SOL/USD price id
    "0x8963217838ab4cf5cadc172203c1f0b763fbaa45f346d8ee50ba994bbcac3026", // TON/USD price id
    "0xdcef50dd0a4cd2dcc17e45df1676dcb336a11a61c69df7a0299b0150c672d25c", // DOGE/USD price id
  ];

  try {
    // Fetch the latest price updates
    const priceUpdates = await connection.getLatestVaas(priceIds);

    // Fetch the latest price feeds
    const priceFeeds = await connection.getLatestPriceFeeds(priceIds);

    if (priceFeeds) {
      // Display the prices
      priceFeeds.forEach((priceFeed) => {});

      // Subscribe to price feed updates
      connection.subscribePriceFeedUpdates(priceIds, async (priceFeed) => {
        console.log(priceFeed.getPriceNoOlderThan(3));
        const verifyRes = await verifyCloudProof(
          req.body,
          process.env.APP_ID,
          process.env.ACTION_ID
        );
        const txData = pythContract.methods
          .registerUser(
            req.body.address,
            req.body.nullifier_hash,
            req.body.username
          )
          .encodeABI();
        const signedTx = await devAccount.signTransaction({
          from: devAccount.address,
          to: contractAddresses.social,
          data: txData,
          gasPrice: await web3.eth.getGasPrice(),
          gasLimit: "5190000",
        });
        // await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      });
      return res.status(200).json({ status: "ok" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
