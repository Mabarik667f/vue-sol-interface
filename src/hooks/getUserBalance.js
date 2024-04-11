import {contract} from "@/services/services";

async function getPrivateTokensFunc(userAddress, address) {
    try {
        const privateTokens = await contract.methods.getPrivateTokensBalanceOnUser(userAddress).call({'from': address})
        return privateTokens;
    } catch(error) {
        return 'Данные не найдены'
    }
}

async function getAllUserData(userAddress, address) {
    try {
        const object = await contract.methods.getAllUserData(userAddress).call({'from': address});
        return object; 
    } catch(error) {
        return 'Данные не найдены'
    }
}

async function getPublicTokensFunc(userAddress, address) {
    try {
        const publicTokens = await contract.methods.getPublicTokensBalanceOnUser(userAddress).call({'from': address});
        return publicTokens;
    } catch(error) {
        return 'Данные не найдены'
    }
}

export async function getUserBalance(role, address, userAddress) {
    console.log(userAddress);
    if(role === 'admin') {
        
        const object = await getAllUserData(userAddress, address);
        console.log(object);

        const privateTokens = await getPrivateTokensFunc(userAddress, address);
        console.log(privateTokens);

        const publicTokens = await getPublicTokensFunc(userAddress, address);
        console.log(publicTokens);

    } else if (role === 'privateProvider') {
        const privateTokens = await getPrivateTokensFunc(userAddress, address);
        console.log(privateTokens);

    } else {
        const publicTokens = await getPublicTokensFunc(userAddress, address);
        console.log(publicTokens);
    }
}