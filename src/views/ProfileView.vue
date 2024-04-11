<template>
    <div>
        <h2>Профиль</h2>
        <div class="profile-info">
            <label>Время жизни системы: <span>5 min</span></label>
            <label>Общая длительность Private фазы: <span>1 min</span></label>
            <label>Время с начала свободной продажи: <span>0 min</span></label>
            <sol-button @click="addOneMinuteHook">+1 минута</sol-button>
            <label>Роль: <span>{{ role }}</span></label>
            <label>Адрес: <span>{{ address }}</span></label>
            <label>ETH: <span>{{ etherBalance }}</span></label>
            <label>CMON: <span>{{ tokenBalance }}</span></label>
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
        <PartnerGift v-if="role === 'publicProvider'"
        @updateTokenBalance="updateTokenBalance"
        @updateEthBalance="updateEthBalance"
        ></PartnerGift>
        <GetUserData 
        v-if="role !== 'user'"></GetUserData>
    </div>
</template>

<script>
import GetUserData from '@/components/GetUserData.vue';
import UserGift from '@/components/UserGift.vue';
import PartnerGift from '@/components/PartnerGift.vue';
import OwnerGift from '@/components/OwnerGift.vue';
import {addOneMinute} from "@/hooks/addOneMinute";
import {mapState} from 'vuex';
import store  from '@/store/index';
import { getUserData } from '@/hooks/getUserData';

export default {
    components: {
        GetUserData,
        UserGift,
        PartnerGift,
        OwnerGift
    },
    data() {
        return {
            
        }
    },
    methods: {
        addOneMinuteHook() {
            addOneMinute(store.state.auth.address);
        },
        updateTokenBalance(newBalance) {
            this.tokenBalance = newBalance;
        },
        updateEthBalance(newBalance) {
            this.etherBalance = newBalance;
        }
    },
    computed: {
        ...mapState({
            isAuth: state => state.auth.isAuth,
            role: state => state.auth.role,
            address: state => state.auth.address
        })
    },

    setup() {
        const {etherBalance, tokenBalance} = getUserData(store.state.auth.address);

        return {
            etherBalance,
            tokenBalance,
        }
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