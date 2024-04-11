import {onMounted, ref} from 'vue';
import {web3, contract} from '../services/services';

export function getUserData(address) {

    const etherBalance = ref(0);
    const tokenBalance = ref(0);

    const getData = async () => {
        web3.eth.getBalance('0x5D3003a172Fb54fCC8Fa63b77F29693640114FcA')
            .then((balance) => {
                etherBalance.value = web3.utils.fromWei(balance, "ether");
            });

        tokenBalance.value = await contract.methods.getBalance(address).call({'from': address})

    }
    onMounted(getData);

    return {
        etherBalance, tokenBalance
    }

}