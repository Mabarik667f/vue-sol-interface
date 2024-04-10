<template>
  <nav>
    <router-link to="/" class="nav__item">Home</router-link>
    <router-link to="/profile" class="nav__item">Profile</router-link>
  </nav>
  <router-view/>
</template>

<style>
*{
  padding: 0;
  margin: 0;
  font-size: 20px;
  box-sizing: border-box;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

a {
  text-decoration: none;
}

nav {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  margin-top: 15px;
}

.nav__item {
  text-decoration: none;
  margin: 0px 10px;
  color: inherit;
  font-size: inherit;
  cursor: pointer;
}

</style>
