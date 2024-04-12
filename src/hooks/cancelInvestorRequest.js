import {contract} from '@/services/services';
export default async function cancelInvestorRequest(investor, address) {
    console.log(investor, address);
    await contract.methods.cancelInvestorRequest(investor).send({'from': address});
}