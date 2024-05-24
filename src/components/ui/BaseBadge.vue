<template>
  <span :class="className"><slot></slot></span>
</template>

<script>
export default {
  props: ['class-name'],
};
</script>

<style scoped>
span {
  width: max-content;
  font-size: clamp(14px, 3vw, 18px);
  text-transform: uppercase;
  border-radius: 25px;
  border: 1px solid transparent;
  padding: clamp(5px, 4vw, 10px) clamp(10px, 4vw, 20px);
  color: #fff;
}

.frontend {
  background-color: var(--primary);
}

.backend {
  background-color: var(--purple);
}

.devops {
  background-color: var(--bordo);
}
</style>
