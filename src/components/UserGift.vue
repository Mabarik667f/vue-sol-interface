<template>
    <sol-form @submit.prevent="userGiftHook" :buttonText="'Подарить'">
        <template v-slot:header>
            <h4>Подарить токены</h4>
        </template>
        <template v-slot:fields>
            <label>Адрес: 
            <sol-input
            v-bind:value="address"
            @input="address = $event.target.value"
            ></sol-input>
            </label>
            <label>Количество: 
                <sol-input
                v-bind:value="amount"
                @input="amount = $event.target.value"
                type="number">
                </sol-input>
            </label>
            <sol-select
            v-model="typeToken"
            :options="typesTokens">
            </sol-select>
        </template>
    </sol-form>
</template>

<script>
import { getTokenBalance } from '@/hooks/getTokenBalance';
import gift from '@/hooks/gift';
import store from '@/store/index';
export default {
    data() {
        return {
            amount: '',
            address: '',
            typeToken: '',
            typesTokens: [
                {value: 0, name: 'Seed'},
                {value: 1, name: 'Private'},
                {value: 2, name: 'Public'}
            ]
        }
    },
    methods: {
        async userGiftHook() {
            try{
                await gift(this.address, this.amount, parseInt(this.typeToken), store.state.auth.address);
                const newBalance = getTokenBalance(store.state.auth.address);
                this.$emit("updateEthBalance", newBalance);

                this.address = '';
                this.amount = '';
            } catch(error) {
                console.log(error);
            }
        }
    }
}
</script>

<style scoped>

</style>