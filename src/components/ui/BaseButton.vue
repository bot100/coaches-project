<template>
  <button v-if="type === 'button'" :class="mode">
    <slot></slot>
  </button>
  <RouterLink v-else-if="type === 'link'" :class="mode"
    ><slot></slot
  ></RouterLink>
</template>

<script>
export default {
  props: ['type', 'class-name', 'mode'],
};
</script>

<style scoped>
button,
a {
  width: max-content;
  border: 1px solid var(--ocean);
  padding: 12px clamp(15px, 4vw, 20px);
  border-radius: 30px;
  font-size: clamp(16px, 3vw, 18px);
  transition: scale 0.3s ease-in-out;

  &:active {
    scale: 0.95;
  }
}

.outline {
  background-color: transparent;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: var(--pink-2);
  }
}

.flat {
  color: var(--second);
  background-color: var(--ocean);
  transition: filter 0.3s ease-in-out;

  &:hover {
    filter: brightness(85%);
  }
}
</style>
