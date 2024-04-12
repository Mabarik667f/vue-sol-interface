import { contract } from "@/services/services";
export default async function acceptInvestorRequest(investor, address) {
    await contract.methods.acceptInvestorRequest(investor).send({"from": address});
}