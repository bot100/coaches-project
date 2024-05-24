<template>
  <form @submit.prevent>
    <slot name="main"> </slot>
    <slot></slot>
  </form>
</template>

<style scoped>
form {
  margin-block-start: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

form.bar {
  flex-direction: row;
  gap: 20px;
}
</style>
