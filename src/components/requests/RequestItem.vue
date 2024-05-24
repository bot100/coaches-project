<template>
  <li>
    <a :href="linkEmail">{{ email }}</a>
    <p>{{ message }}</p>
  </li>
</template>

<script>
export default {
  props: ['email', 'message'],
  computed: {
    linkEmail() {
      return `mailto:${this.email}`;
    },
  },
};
</script>

<style scoped>
li {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #000;
  padding: 20px;
}

p,
a {
  font-size: 20px;
}
</style>
