import { contract } from "@/services/services";
export default async function changeTokenPrice(newPrice, address) {
    await contract.methods.changePublicTokenPrice(newPrice).send({'from': address});
}