<template>
    <h4>Заявки на предоставление статуса "Инвестор"</h4>
    <ul v-for="request in requests" :key="request.id" class="all-requests">
        <li class="in-request">
            <label><strong>Имя: </strong><span>{{ request.name }}</span></label>
            <label><strong>Адрес: </strong><span>{{ request.address }}</span></label>
            <sol-button class="btn-success" @click="acceptRequest">Одобрить</sol-button>
            <sol-button class="btn-danger" @click="cancelRequest">Отклонить</sol-button>
        </li>
    </ul>
</template>
``
<script>
export default {
    name: 'investors-requests-list',
    data() { 
        return {
            requests: [
                {id: 1, name: 'Bobi', address: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'},
                {id: 2, name: 'Bobi', address: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'},
                {id: 3, name: 'Bobi', address: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'},
                {id: 4, name: 'Bobi', address: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'},

            ]
        }
    },
    methods: {
        acceptRequest() {
            this.requests.pop()
        },

        cancelRequest() {

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