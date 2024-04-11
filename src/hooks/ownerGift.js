import {contract} from "@/services/services";
export async function ownerGift(to, amount, address) {
    try{
        await contract.methods.ownerGift(to, amount).send({'from': address});
    } catch(error) {
        console.log(error);
        throw error;
    }
}