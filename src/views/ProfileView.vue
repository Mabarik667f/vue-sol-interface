<template>
    <div>
        <div class="profile-info">
            <label>Время жизни системы: <span>5 min</span></label>
            <label>Общая длительность Private фазы: <span>1 min</span></label>
            <label>Время с начала свободной продажи: <span>0 min</span></label>
            <label>Роль: <span>Владелец</span></label>
            <label>Адрес: <span>0x5B38Da6a701c568545dCfcB03FcB875f56beddC4</span></label>
            <label>ETH: <span>100</span></label>
            <label>CMON: <span> 100000</span></label>
        </div>
        <h2>Функции</h2>
        <div>
            <sol-button @click="$router.push('/buyTokens')">Купить токены</sol-button>
            <sol-button @click="$router.push('/investorRequest')">Стать Инвестором</sol-button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.profile-info {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

}
</style>