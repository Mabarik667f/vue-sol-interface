<template>
    <form class="form-class">
      <slot name="header"></slot>
      <slot name="fields"></slot>
      <sol-button type="submit">{{ buttonText }}</sol-button>
    </form>
  </template>
  
<script>
export default {
name: 'sol-form',
props: {
    buttonText: {
    type: String,
    default: 'Submit'
    }
},

};
</script>
  
<style scoped>
.form-class {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
}
</style>
