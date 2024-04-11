<template>
    <sol-form @submit.prevent="" :buttonText="'Подарить'">
        <template v-slot:header>
            <h4>Подарок от владельца</h4>
        </template>
        <template v-slot:fields>
            <label>Адрес: <sol-input></sol-input></label>
        </template>
    </sol-form>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>