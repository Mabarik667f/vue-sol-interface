import {contract} from "@/services/services";
/* global BigInt */
export default async function buyTokens(type, amount, address) {
    console.log(type);
    if(type === '1') {
        const tokenPrice = await contract.methods.privateTokenPrice().call({'from': address});
        await contract.methods.buyPrivateTokens(amount).send({'from': address, 'value': tokenPrice * BigInt(amount)});
    } else {
        const tokenPrice = await contract.methods.publicTokenPrice().call({'from': address});
        await contract.methods.buyPublicTokens(amount).send({'from': address, 'value': tokenPrice * BigInt(amount)});
    }
}