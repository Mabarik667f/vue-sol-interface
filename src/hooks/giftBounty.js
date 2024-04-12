import {contract} from "@/services/services";
/* global BigInt */
export async function giftBounty(to, amount, address) {
    try{
        const tokenPrice = contract.methods.publicTokenPrice().call({'from': address});
        await contract.methods.getBounty(to, amount).send({'from': address,
         'value': tokenPrice * BigInt(amount)});
    } catch(error) {
        console.log(error)
        throw error
    }
}