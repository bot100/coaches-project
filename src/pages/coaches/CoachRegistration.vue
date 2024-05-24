<template>
  <section class="registration">
    <BaseCard>
      <h3>Register as a coach now!</h3>
      <CoachForm @data-in-come="getData"></CoachForm>
    </BaseCard>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: { CoachForm },
  methods: {
    getData(data) {
      this.$store.dispatch('coaches/newCoach', data);
      this.$router.push('/coaches');
    },
  },
};
</script>

<style scoped>
h3 {
  font-size: 30px;
  margin-block-start: 20px;
}
</style>
