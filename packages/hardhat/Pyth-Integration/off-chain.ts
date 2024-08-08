import { PriceServiceConnection, PriceFeed } from '@pythnetwork/price-service-client';

// Function to fetch the price updates
async function priceFetcher() {
  // Create a connection to Hermes
  const connection = new PriceServiceConnection("https://hermes.pyth.network", {
    priceFeedRequestConfig: {
      // Retrieve binary price updates for on-chain contracts
      binary: true
    }
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
    "0xdcef50dd0a4cd2dcc17e45df1676dcb336a11a61c69df7a0299b0150c672d25c"  // DOGE/USD price id
  ];

  try {
    // Fetch the latest price updates
    const priceUpdates = await connection.getLatestVaas(priceIds);

    // Fetch the latest price feeds
    const priceFeeds: PriceFeed[] | undefined = await connection.getLatestPriceFeeds(priceIds);

    if (priceFeeds) {
      // Display the prices
      priceFeeds.forEach(priceFeed => {
        console.log(`Received an update for ${priceFeed.id}: ${priceFeed.getPriceNoOlderThan(60)}`);
      });

      // Subscribe to price feed updates
      connection.subscribePriceFeedUpdates(priceIds, (priceFeed: PriceFeed) => {
        console.log(`Received an update for ${priceFeed.id}: ${priceFeed.getPriceNoOlderThan(60)}`);
      });
    } else {
      console.log("No price feeds available");
    }

    // Close the WebSocket connection after 60 seconds
    setTimeout(() => {
      connection.closeWebSocket();
    }, 60000);
  } catch (error) {
    console.error("Error fetching price updates:", error);
  }
}

// Run the priceFetcher function
priceFetcher();








// import React, { useEffect, useState } from 'react';
// import { PriceServiceConnection } from '@pythnetwork/client';


// const PriceTable = () => {
//   const [prices, setPrices] = useState([]);


//   useEffect(() => {
//     const fetchData = async () => {
//       const connection = new PriceServiceConnection("https://hermes.pyth.network", {
//         priceFeedRequestConfig: {
//           binary: true,
//         },
//       });


//       const priceIds = [
//         "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43", // BTC/USD price id
//         "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace", // ETH/USD price id
//       ];


//       const priceFeeds = await connection.getLatestPriceFeeds(priceIds);
//       setPrices(priceFeeds);


//       connection.subscribePriceFeedUpdates(priceIds, (priceFeed) => {
//         setPrices((prevPrices) => {
//           const updatedPrices = prevPrices.map(p => p.id === priceFeed.id ? priceFeed : p);
//           return updatedPrices;
//         });
//       });


//       return () => {
//         connection.closeWebSocket();
//       };
//     };


//     fetchData();
//   }, []);


//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Asset</th>
//           <th>Price</th>
//           <th>Confidence</th>
//           <th>Last Updated</th>
//         </tr>
//       </thead>
//       <tbody>
//         {prices.map(price => (
//           <tr key={price.id}>
//             <td>{price.id}</td>
//             <td>{price.getPriceNoOlderThan(60)?.price}</td>
//             <td>{price.getPriceNoOlderThan(60)?.conf}</td>
//             <td>{new Date(price.getPriceNoOlderThan(60)?.publishTime * 1000).toLocaleString()}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };


// export default PriceTable;