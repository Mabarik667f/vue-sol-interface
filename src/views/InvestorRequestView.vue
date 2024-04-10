<template>
    <sol-form :buttonText="'Отправить'" @submit.once="addRequest">
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
export default {
    data() {
        return {
            name: ''
        }
    },
    methods: {
        addRequest() {
            
        }
    }
}
</script>

<style scoped>
 
</style>