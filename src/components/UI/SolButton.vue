<template>
    <button class="sol__btn btn btn-primary">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'sol-button'
}
</script>

<style scoped>
.sol_button {
    cursor: pointer;
}
</style>