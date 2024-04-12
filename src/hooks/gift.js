import {contract} from "@/services/services";
export default async function gift(to, amount, typeToken, address) {
    try{
        console.log(to, amount, typeToken, address);
        await contract.methods.giftTokens(amount, to, typeToken).send({'from': address});
    } catch(error) {
        console.log(error);
        throw error;
    }
}