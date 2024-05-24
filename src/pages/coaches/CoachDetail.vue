<template>
  <section class="details">
    <BaseCard>
      <h2>{{ fullName }}</h2>
      <h3>${{ moneyInHour }}/hour</h3>
    </BaseCard>

    <BaseCard>
      <h2>Interested? Reach out now!</h2>
      <BaseButton type="link" :to="linkContact" mode="flat">Contact</BaseButton>
      <RouterView></RouterView>
    </BaseCard>

    <BaseCard>
      <div class="container">
        <BaseBadge v-for="(tag, i) in tags" :key="i" :class-name="tag">{{
          tag
        }}</BaseBadge>
      </div>
      <p>{{ description }}</p>
    </BaseCard>
  </section>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
    };
  },

  computed: {
    linkContact() {
      return `${this.$route.path}/contact`;
    },

    fullName() {
      return this.selectedCoach.fullName;
    },

    tags() {
      return this.selectedCoach.tags;
    },

    moneyInHour() {
      return this.selectedCoach.moneyInHour;
    },

    description() {
      return this.selectedCoach.description;
    },
  },

  created() {
    this.selectedCoach = this.$store.getters['coaches/getAccessToCoaches'].find(
      (coach) => coach.id === this.id
    );
  },
};
</script>

<style scoped>
section.details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

p {
  font-size: 18px;
  line-height: 1.5;
}

.container {
  display: flex;
  gap: 10px;
  padding: 10px;
}
</style>
