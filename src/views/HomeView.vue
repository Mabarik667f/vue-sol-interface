<template>
  <div class="home">
    <h1>Главная</h1>
  </div>
</template>

<script>
import {mapActions} from "vuex";
export default {
  name: 'HomeView',
  methods: {
    ...mapActions({
      login: 'login'
    })
  },
  mounted() {
    this.login();
  }
}
</script>
