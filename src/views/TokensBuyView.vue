<template>
    <div>{{ like }}</div>
    <sol-form :buttonText="'Купить'" @submit.once="buyTokens">
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
            </label>
            <label>
                Тип Токена:
                 <sol-select
                 v-model="typeToken"
                 :options="typesTokens">
                 </sol-select>
            </label>
        </template>
    </sol-form>
</template>

<script>
export default {
    data() {
        return {
            amount: '',
            typeToken: '',
            typesTokens: [
                {value: 1, name: 'Private'},
                {value: 2, name: 'Public'}
            ]
        }
    },
    methods: {
        buyTokens() {
            
        }
    }
}
</script>

<style scoped>
.buy__form {

}
</style>