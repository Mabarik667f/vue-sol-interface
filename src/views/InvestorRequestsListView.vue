<template>
    <h4>Заявки на предоставление статуса "Инвестор"</h4>
    <ul v-for="request in requests" :key="request.id" class="all-requests">
        <li class="in-request">
            <label><strong>Имя: </strong><span>{{ request.name }}</span></label>
            <label><strong>Адрес: </strong><span>{{ request.address }}</span></label>
            <div v-if="this.role === 'privateProvider'">
            <sol-button class="btn-success" @click="acceptRequest(request.id, request.address)">Одобрить</sol-button>
            <sol-button class="btn-danger" @click="cancelRequest(request.id, request.address)">Отклонить</sol-button>
            </div>
        </li>
    </ul>
</template>
``
<script>
import requestsList from "@/hooks/requestsList";
import acceptInvestorRequest from '@/hooks/acceptInvestorRequest';
import cancelInvestorRequest from '@/hooks/cancelInvestorRequest';
import { mapState } from 'vuex';

export default {
    name: 'investors-requests-list',
    data() { 
        return {
            requests: []
        }
    },

    mounted() {
        this.getPosts();
    },

    computed: {
        ...mapState({
            address: state => state.auth.address,
            role: state => state.auth.role
        })
    },

    methods: {
        async acceptRequest(requestId, requestAddress) {
            await acceptInvestorRequest(requestAddress , this.address);
            this.requests = this.requests.filter(request => request.id !== requestId);
        },

        async cancelRequest(requestId, requestAddress) {
            await cancelInvestorRequest(requestAddress , this.address);
            this.requests = this.requests.filter(request => request.id !== requestId);
        },

        async getPosts() {
            this.requests = await requestsList(this.address);
        }
    }

}
</script>

<style scoped>
.all-requests {
    list-style: none;
}
.in-request {

}
</style>