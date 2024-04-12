import {contract, web3} from "@/services/services";
import { onMounted , ref} from "vue";

export default function getTokenPrice(address) {
    const publicTokenPrice = ref(0);
    const getPrice = async () => {
        const weiPrice = await contract.methods.publicTokenPrice().call({'from': address});
        publicTokenPrice.value = web3.utils.fromWei(weiPrice, "ether");
        
    }
    onMounted(getPrice);
    return {
        publicTokenPrice
    }
}