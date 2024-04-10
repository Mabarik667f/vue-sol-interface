<template>
    <div>
        <h2>Профиль</h2>
        <div class="profile-info">
            <label>Время жизни системы: <span>5 min</span></label>
            <label>Общая длительность Private фазы: <span>1 min</span></label>
            <label>Время с начала свободной продажи: <span>0 min</span></label>
            <label>Роль: <span>{{ role }}</span></label>
            <label>Адрес: <span>{{ address }}</span></label>
            <label>ETH: <span>{{ ethBalance }}</span></label>
            <label>CMON: <span>{{ tokenBalance }}</span></label>
        </div>
        <div>
            <sol-button @click="$router.push('/buyTokens')">Купить токены</sol-button>
            <sol-button @click="$router.push('/investorRequest')">Стать Инвестором</sol-button>
        </div>
        <InvestorsRequestList v-if="role === 'admin' || role == 'privateProvider'">
        </InvestorsRequestList>
        <GetUserData v-if="role !== 'user'"></GetUserData>
    </div>
</template>

<script>
import InvestorsRequestList from '@/components/InvestorsRequestsList.vue';
import GetUserData from '@/components/GetUserData.vue';
import {mapState} from 'vuex';
export default {
    components: {
        InvestorsRequestList,
        GetUserData
    },
    data() {
        return {
            ethBalance: '100',
            tokenBalance: '100000'
        }
    },
    computed: {
        ...mapState({
            isAuth: state => state.auth.isAuth,
            role: state => state.auth.role,
            address: state => state.auth.address
        })
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