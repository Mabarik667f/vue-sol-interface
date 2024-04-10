import {onMounted, ref} from 'vue';
import {web3, contract} from '../services/services';

export function getUserData(address) {
    console.log(address);

    const etherBalance = ref(0);
    const tokenBalance = ref(0);
    const role = ref('');

    const getData = () => {
        web3.eth.getBalance('0x5D3003a172Fb54fCC8Fa63b77F29693640114FcA')
            .then((balance) => {
                etherBalance.value = web3.utils.fromWei(balance, "ether");
            });

        tokenBalance.value = contract.methods.getBalance(address).call({'from': address})
        .then((balance) => {
            tokenBalance.value = balance;
        });

        contract.methods.getYourSelfData().call({'from': address})
        .then((object) => {
            role.value = object.role
        });
    }
    onMounted(getData);

    return {
        etherBalance, tokenBalance, role
    }

}