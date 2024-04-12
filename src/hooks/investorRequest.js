import {contract} from "@/services/services";

export const inverstorRequest = async function(name, address) {
    try {
        await contract.methods.inverstorRequest(name).send({'from': address});
        return 'success';
    } catch(error) {
        console.log('Фаза подачи закончилась или Ваш запрос в обработке');
        throw error; 
    }
};