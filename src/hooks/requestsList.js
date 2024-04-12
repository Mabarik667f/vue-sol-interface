import {contract} from "@/services/services";

export default async function requestsList(address) {
    const requests = await contract.methods.getRequests().call({'from': address});
    let requestsList = [];
    let i = 1;
    for(let request of requests) {
        const requestData = await contract.methods.investorsRequests(request).call({'from': address});
        if(requestData.account !== '0x0000000000000000000000000000000000000000' && requestData.name) {
            requestsList.push({id: i, name: requestData.name, address: requestData.account});
        }
    }
    return requestsList;
}