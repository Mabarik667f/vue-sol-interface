<template>
    <form method="post" class="buy__form">
        <h1>Покупка токенов</h1>
        <p>Приватные токены могу покупать только пользователи, находящиеся в списке инвесторов.
            <br>Лимит на одну транзакцию для private токена - 100000
            <br>Лимит на одну транзакцию для public токена - 5000
        </p>
        <label>Количество: <sol-input :type="number"></sol-input></label>
        <label>Тип Токена: <sol-select></sol-select></label>
        <sol-button type="submit">Купить</sol-button>
        
    </form>
</template>

<script>
export default {

}
</script>

<style scoped>
.buy__form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

}
</style>