import {contract} from "@/services/services";
import { onMounted, ref } from "vue";
/* global BigInt */
export default function getSystemLifeTime(address) {
    const systemLifeMinutes = ref(0);
    const privateStageTime = ref(10);
    const publicStageTime = ref(0);

    const getSystemData = async () => {
        systemLifeMinutes.value = await contract.methods.systemLifeMinutes().call({'from': address});
        if(15 > systemLifeMinutes.value > 5) {
            privateStageTime.value = BigInt(15) - systemLifeMinutes.value;
        } else if (systemLifeMinutes.value >= 15) {
            privateStageTime.value = 0;
            publicStageTime.value = systemLifeMinutes.value - BigInt(15);
        }
    }

    onMounted(getSystemData)


    return {
        systemLifeMinutes,
        publicStageTime,
        privateStageTime
    }


}