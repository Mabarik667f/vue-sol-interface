<template>
    <div>
        <h2>Профиль</h2>
        <div class="profile-info">
            <label>Время жизни системы: <span>5 min</span></label>
            <label>Общая длительность Private фазы: <span>1 min</span></label>
            <label>Время с начала свободной продажи: <span>0 min</span></label>
            <label>Роль: <span>{{ role }}</span></label>
            <label>Адрес: <span>{{ address }}</span></label>
            <label>ETH: <span>{{ etherBalance }}</span></label>
            <label>CMON: <span>{{ tokenBalance }}</span></label>
        </div>
        <div>
            <sol-button @click="$router.push('/buyTokens')">Купить токены</sol-button>
            <sol-button @click="$router.push('/investorRequest')">Стать Инвестором</sol-button>
        </div>
        <InvestorsRequestList v-if="role === 'admin' || role == 'privateProvider'">
        </InvestorsRequestList>
        <GetUserData v-if="role !== 'user'"></GetUserData>
        <sol-button @click="getBalance">d</sol-button>
    </div>
</template>

<script>
import InvestorsRequestList from '@/components/InvestorsRequestsList.vue';
import GetUserData from '@/components/GetUserData.vue';
import {mapState} from 'vuex';
import {web3} from "@/services/services";
import store  from '@/store/index';
import { getUserData } from '@/hooks/getUserData';

export default {
    components: {
        InvestorsRequestList,
        GetUserData
    },
    data() {
        return {
            
        }
    },
    methods: {
        getBalance() {
            web3.eth.getBalance('0x5D3003a172Fb54fCC8Fa63b77F29693640114FcA')
            .then((balance) => {
                console.log(web3.utils.fromWei(balance, "ether"));
            });
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
        const {etherBalance, tokenBalance, role} = getUserData(store.state.auth.address);

        return {
            etherBalance,
            tokenBalance,
            role
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