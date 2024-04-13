import {contract} from "@/services/services";
/* global BigInt */
export async function giftBounty(to, amount, address) {
    try{
        const tokenPrice = await contract.methods.publicTokenPrice().call({'from': address});
        await contract.methods.getBounty(amount, to).send({'from': address,
         'value': tokenPrice * BigInt(amount)});
    } catch(error) {
        console.log(error)
        throw error
    }
}