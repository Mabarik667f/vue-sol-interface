<template>
    <div>
        <sol-form :buttonText="'Изменить'" @submit.prevent="changeTokenPriceHook">
            <template v-slot:header>
                <h4>Изменить цену публичного токена</h4>
            </template>
            <template v-slot:fields>
                <label>Цена в wei: 
                    <sol-input
                    v-bind:value="price"
                    @input="price = $event.target.value"
                    type="number"></sol-input>
                </label>
            </template>
        </sol-form>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import changeTokenPrice from "@/hooks/changeTokenPrice";
export default {
    name: 'change-token-price',
    data() {
        return {
            price: ''
        }
    },
    computed: {
        ...mapState({
            address: state => state.auth.address
        })
    },
    methods: {
        async changeTokenPriceHook() {
            await changeTokenPrice(this.price, this.address);
            this.$emit('updateTokenPrice', this.price);

            this.price = '';
            
        }
    }
}
</script>

<style scoped>

</style>