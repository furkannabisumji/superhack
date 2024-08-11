import Web3 from 'web3';
import RandomNumberGeneratorABI from './RandomNumberGeneratorABI.json'; // Replace with the actual ABI JSON file

const contractAddress = '0xYourContractAddress';

// Initialize Web3 using MetaMask's provider
const web3 = new Web3(window.ethereum); // MetaMask as provider

// Initialize the contract instance
const contract = new web3.eth.Contract(RandomNumberGeneratorABI, contractAddress);

// Get the user's account (MetaMask)
async function getAccount() {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  return accounts[0];
}

// Generate a 32-byte random number
function generateRandomNumber() {
  return web3.utils.randomHex(32);
}

// Request a random number from the smart contract
async function requestRandomNumber() {
  const account = await getAccount();
  const randomNumber = generateRandomNumber();

  try {
    // Get the fee required for requesting a random number
    const fee = await contract.methods.getFee('YourProvider').call(); // Replace 'YourProvider' with the actual provider name expected by your contract

    // Send the transaction to request a random number
    const receipt = await contract.methods.requestRandomNumber(randomNumber).send({
      from: account,
      value: fee,
    });

    console.log('Transaction receipt:', receipt);
  } catch (error) {
    console.error('Error requesting random number:', error);
  }
}

// Listen for the RandomNumberFulfilled event
function listenForRandomNumberFulfillment() {
  contract.events.RandomNumberFulfilled()
    .on('data', (event) => {
      console.log('Random number fulfilled:', event.returnValues);
      const sequenceNumber = event.returnValues.sequenceNumber;
      const randomNumber = event.returnValues.randomNumber;

      console.log(`Sequence Number: ${sequenceNumber}`);
      console.log(`Random Number: ${randomNumber}`);
    })
    .on('error', (error) => {
      console.error('Error listening for RandomNumberFulfilled event:', error);
    });
}

// Call these functions as needed in your application
requestRandomNumber(); // Request a random number
listenForRandomNumberFulfillment(); // Listen for fulfillment
