import {contract} from "@/services/services";
export async function getTokenBalance(address) {
    
    const newBalance = await contract.methods.getBalance().call({'from': address});
    return newBalance;
}