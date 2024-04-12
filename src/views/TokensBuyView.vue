<template>
    <sol-form :buttonText="'Купить'" @submit.prevent="buyTokensHook">
        <template v-slot:header>
            <h1>Покупка токенов</h1>
            <p>Приватные токены могу покупать только пользователи, находящиеся в списке инвесторов.
                <br>Лимит на одну транзакцию для private токена - 100000
                <br>Лимит на одну транзакцию для public токена - 5000
            </p>
        </template>
        <template v-slot:fields>
            <label>Количество:
                 <sol-input 
                  type="number"
                  v-bind:value="amount"
                  @input="amount = $event.target.value"></sol-input>
                  {{ this.errors.amount }}
            </label>
            <label>
                Тип Токена:
                 <sol-select
                 v-model="typeToken"
                 :options="typesTokens">
                 </sol-select>
                 {{ this.errors.typeToken }}
            </label>
        </template>
    </sol-form>
</template>

<script>
import { mapState } from 'vuex';
import buyTokens from '@/hooks/buyTokens';
export default {
    data() {
        return {
            amount: '',
            typeToken: '',
            typesTokens: [
                {value: 1, name: 'Private'},
                {value: 2, name: 'Public'}
            ],
            errors: {}
        }
    },
    computed: {
        ...mapState({
            address: state => state.auth.address
        })
    },
    methods: {

        async buyTokensHook() {
            if(this.formValidator()) {
                await buyTokens(this.typeToken, this.amount, this.address);
                this.$router.push('/profile');
            }
        },
        formValidator() {
            if(!this.typeToken) {
                this.errors.typeToken = 'select type Token!';
            }
            
            if (!this.amount) {
                this.errors.amount = 'write amount !';
            }

            return Object.keys(this.errors).length > 0 ? false : true;
        }
    }
}
</script>

<style scoped>
.buy__form {

}
</style>