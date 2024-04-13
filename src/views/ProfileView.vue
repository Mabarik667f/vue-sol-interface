<template>
    <div>
        <h2>Профиль</h2>
        <div class="profile-info">
            <label>Время жизни системы: <span>{{ systemLifeMinutes }} min</span></label>
            <label>Общая длительность Private фазы: <span>{{ privateStageTime }} min</span></label>
            <label>Время с начала свободной продажи: <span>{{ publicStageTime }} min</span></label>
            <sol-button @click="addOneMinuteHook">+1 минута</sol-button>
            <label>Роль: <span>{{ role }}</span></label>
            <label>Адрес: <span>{{ address }}</span></label>
            <label>ETH: <span>{{ etherBalance }}</span></label>
            <label>CMON: <span>{{ tokenBalance }}</span></label>
            <label>Цена Public Токена: <span>{{ publicTokenPrice }}</span></label>
        </div>
        <div>
            <sol-button @click="$router.push('/buyTokens')">Купить токены</sol-button>
            <sol-button @click="$router.push('/investorRequest')">Стать Инвестором</sol-button>
            <sol-button v-if="role === 'admin' || role === 'privateProvider'"
            @click="$router.push('/requestsList')"
            >Список заявок
            </sol-button>
        </div>
        <UserGift
        @updateTokenBalance="updateTokenBalance"
        ></UserGift>
        <OwnerGift 
        @updateTokenBalance="updateTokenBalance"
        v-if="role === 'admin'">
        </OwnerGift>
        <div v-if="role === 'publicProvider'">
            <ChangeTokenPrice
            @updateTokenPrice="updateTokenPrice"></ChangeTokenPrice>
            <PartnerGift
            @updateTokenBalance="updateTokenBalance"
            @updateEthBalance="updateEthBalance"
            ></PartnerGift>
        </div>
        <GetUserData 
        v-if="role !== 'user'"></GetUserData>

    </div>
</template>

<script>
import GetUserData from '@/components/GetUserData.vue';
import UserGift from '@/components/UserGift.vue';
import PartnerGift from '@/components/PartnerGift.vue';
import OwnerGift from '@/components/OwnerGift.vue';
import ChangeTokenPrice from "@/components/ChangeTokenPrice.vue";

import getTokenPrice from '@/hooks/getTokenPrice';
import getSystemLifeTime from "@/hooks/getSystemLifeTime";
import store from "@/store/index";

import {addOneMinute} from "@/hooks/addOneMinute";
import {mapState} from 'vuex';
import {getUserData} from '@/hooks/getUserData';
import {web3} from "@/services/services"


export default {
    components: {
        GetUserData,
        UserGift,
        PartnerGift,
        OwnerGift,
        ChangeTokenPrice
    },

    methods: {
        addOneMinuteHook() {
            addOneMinute(this.address);
            this.updateTime();
        },
        updateTokenBalance(newBalance) {
            this.tokenBalance = newBalance;
        },
        updateEthBalance(newBalance) {
            this.etherBalance = newBalance;
        },
        updateTokenPrice(newPrice) {
            this.publicTokenPrice = web3.utils.fromWei(newPrice, "ether");
        },
        updateTime() {
            this.systemLifeMinutes++;
            if(this.systemLifeMinutes >= 15) {
                this.publicStageTime++;
            }
            if(this.privateStageTime > 0 && this.systemLifeMinutes > 5) {
                this.privateStageTime--;
            }
        }
    },
    computed: {
        ...mapState({
            isAuth: state => state.auth.isAuth,
            role: state => state.auth.role,
            address: state => state.auth.address
        }),
        
    },

    setup() {
        const {etherBalance, tokenBalance} = getUserData(store.state.auth.address);
        const {publicTokenPrice} = getTokenPrice(store.state.auth.address);
        const {systemLifeMinutes, publicStageTime, privateStageTime} =
         getSystemLifeTime(store.state.auth.address);

        return {
            etherBalance,
            tokenBalance,
            publicTokenPrice,
            systemLifeMinutes, publicStageTime, privateStageTime
        }
    },
    mounted() {
        setInterval(this.updateTime, 60000);
    }
}
</script>

<style scoped>
.profile-info {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

}
</style>