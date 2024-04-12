<template>
    <sol-form @submit.prevent="giftBountyHook" :buttonText="'Подарить'">
        <template v-slot:header>
            <h4>Токены для рекламодателя</h4>
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
        </template>
    </sol-form>
</template>

<script>
import { getTokenBalance } from '@/hooks/getTokenBalance';
import { giftBounty } from '@/hooks/giftBounty';
import store from '@/store/index';
export default {
    
    data() {
        return {
            address: '',
            amount: '',
        }
    },
    methods: {
        async giftBountyHook() {
            try{
                await giftBounty(this.address, this.amount, store.state.auth.address);
                const newBalance = await getTokenBalance(store.state.auth.address);
                this.$emit('updateTokenBalance', newBalance);
                this.$emit('updateEthBalance', 0);

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