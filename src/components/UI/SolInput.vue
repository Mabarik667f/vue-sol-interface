<template>
    <input class="sol__input" :type="type">
</template>

<script>
export default {
    name: 'sol-input',
    props: {
        type: {
            type: String,
            default: 'text'
        }
    }
}
</script>

<style scoped>
.sol__input {

}
</style>