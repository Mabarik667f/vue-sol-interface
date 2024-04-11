<template>
    <h4>Получить данные о пользователе</h4>
    <form method="post" @submit.prevent="getUserBalanceHandler">
        <label>Пользователь: 
            <sol-input 
            v-bind:value="address"
            @input="address = $event.target.value"
            class="user-data-input">
        </sol-input>
        </label>
        <sol-button>Получить</sol-button>
    </form>
</template>

<script>
import { getUserBalance } from '@/hooks/getUserBalance';
import store from "@/store/index";

export default {
    data() {
        return {
            address: ''
        }
    },
    methods: {
        getUserBalanceHandler() {
            getUserBalance(store.state.auth.role,
            store.state.auth.address, this.address
            )
        }
    },

}
</script>

<style scoped>

</style>