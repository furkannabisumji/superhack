
import Web3 from 'web3';
import fs from 'fs';
import path from 'path';
export const web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.base.org'));
const contractABIs = JSON.parse(fs.readFileSync(path.resolve('./web3/abis.json'),'utf-8'))
export const contractAddresses = JSON.parse(fs.readFileSync(path.resolve('./web3/contractAddresses.json'),'utf-8'))
export const devAccount = web3.eth.accounts.privateKeyToAccount(Uint8Array.from(Buffer.from("0cf244fd07630c5aa5b5c7042083fecc8cf0debcdb21b00f283f9b32f9eda333",'hex')))
export const contract = new web3.eth.Contract(contractABIs.social, contractAddresses.social);
export const pythContract = new web3.eth.Contract(contractABIs.pyth, contractAddresses.pyth);
