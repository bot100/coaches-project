<template>
  <section class="card"><slot></slot></section>
</template>

<style scoped>
section.card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  width: min(90vw, 600px);
}
</style>
