<template>
  <div class="form-item">
    <slot></slot>
  </div>
</template>

<style scoped>
.form-item {
  display: flex;
  flex-direction: column;
  font-size: 20px;
  gap: 10px;
}

.form-item.bar {
  flex-direction: row;
  font-size: 16px;
  gap: 5px;
}

.form-item > label {
  font-weight: bold;
}

.form-item > :is(input, textarea) {
  border: 1px solid #000;
  padding: 10px 10px;
  font-size: 20px;
}
</style>
