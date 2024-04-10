<template>
    <h4>Получить данные о пользователе</h4>
    <form method="post" @submit.prevent="getUserData">
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
export default {
    data() {
        return {
            address: ''
        }
    },
    methods: {
        getUserData() {

        }
    }
}
</script>

<style scoped>

</style>