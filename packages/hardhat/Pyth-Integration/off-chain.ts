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
    "0x7d669ddcdd23d9ef1fa9a9cc022ba055ec900e91c4cb960f3c20429d4447a411", // CELO/USD price id
    "0x5de33a9112c2b700b8d30b8a3402c103578ccfa2765696471cc672bd5cf6ac52", // MATIC/USD price id
    "0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d", // SOL/USD price id
    "0x8963217838ab4cf5cadc172203c1f0b763fbaa45f346d8ee50ba994bbcac3026", // TON/USD price id
    "0xdcef50dd0a4cd2dcc17e45df1676dcb336a11a61c69df7a0299b0150c672d25c", // DOGE/USD price id
    "0x2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f", // BNB/USD
    "0x4a8e42861cabc5ecb50996f92e7cfa2bce3fd0a2423b0c44c9b423fb2bd25478", // COMP/USD
    "0xb0948a5e5313200c632b51bb5ca32f6de0d36e9950a942d19751e833f70dabfd", // DAI/USD
    "0x385f64d993f7b77d8182ed5003d97c60aa3361f3cecfe711544d2d59165e9bdf", // OP/USD
    "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a", // USDC/USD
    "0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b" // USDT/USD
  ];

  try {
    // Fetch the latest price updates
    const priceUpdates = await connection.getLatestVaas(priceIds);
    console.log(priceUpdates);

    // Fetch the latest price feeds
    const priceFeeds: PriceFeed[] | undefined = await connection.getLatestPriceFeeds(priceIds);
    console.log(priceFeeds);

    if (priceFeeds) {
      // Display the prices
      priceFeeds.forEach(priceFeed => {
        const priceData = priceFeed.getPriceNoOlderThan(60);
        if (priceData) {
          const prices = priceData.price; // Raw price
          const expo = priceData.expo; // Exponent
          
          // Calculate the actual price
          const priceNumber = parseFloat(prices);
          const actualPrice = priceNumber / Math.pow(10, Math.abs(expo));
          
          // Format the actual price to two decimal places
          const formattedPrice = actualPrice.toFixed(2);
          console.log(`Received an update for ${priceFeed.id}: ${formattedPrice}`);
        } else {
          console.log(`Price not available for ${priceFeed.id}`);
        }
      });
    } else {
      console.log("No price feeds available");
    }

    // Subscribe to price feed updates
    connection.subscribePriceFeedUpdates(priceIds, (priceFeed: PriceFeed) => {
      const priceData = priceFeed.getPriceNoOlderThan(60);
      if (priceData) {
        const prices = priceData.price; // Raw price
        const expo = priceData.expo; // Exponent
        
        // Calculate the actual price
        const priceNumber = parseFloat(prices);
        const actualPrice = priceNumber / Math.pow(10, Math.abs(expo));
        
        // Format the actual price to two decimal places
        const formattedPrice = actualPrice.toFixed(2);
        console.log(`Received an update for ${priceFeed.id}: ${formattedPrice}`);
      } else {
        console.log(`Price not available for ${priceFeed.id}`);
      }
    });

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





