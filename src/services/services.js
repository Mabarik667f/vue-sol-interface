import Web3 from "web3";
import contractData from "./contract-data";

// const Personal = require('web3-eth-personal');
const {abi, address} = contractData;
const w3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545");
const cont = new w3.eth.Contract(abi, address);

export const web3 = w3;
export const contract = cont;
