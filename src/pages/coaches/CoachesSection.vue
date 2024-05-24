<template>
  <section class="section section-coaches">
    <CoachesList></CoachesList>
  </section>
</template>

<script>
import CoachesList from '../../pages/coaches/CoachesList.vue';
export default {
  components: {
    CoachesList,
  },
};
</script>

<style scoped>
section.section-coaches {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
