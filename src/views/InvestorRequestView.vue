<template>
    <sol-form :buttonText="'Отправить'" @submit.prevent="addRequestHook">
        <template v-slot:header>
            <h1>Заявка на включение в список инвесторов</h1>
        </template>
        <template v-slot:fields>
            <label>
                <strong>Имя: </strong>
                <sol-input
                v-bind:value="name"
                @input="name = $event.target.value"
                ></sol-input></label>
        </template>
    </sol-form>

</template>

<script>
import { inverstorRequest } from '@/hooks/investorRequest';
import store from '@/store/index';

export default {
    data() {
        return {
            name: ''
        }
    },
    methods: {
        async addRequestHook() {
            try {
                const res = await inverstorRequest(this.name, store.state.auth.address);
                if(res === 'success') {
                    this.$router.push('/profile');
                }
            } catch(error) {
                console.log(error)
            }
        }
    }
}
</script>

<style scoped>
 
</style>