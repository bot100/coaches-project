<template>
  <BaseDialog :show="!!error" title="An error ocurred!" @close="handlerError">
    <p>{{ error }}</p>
  </BaseDialog>
  <CoachesBar @change-filter="setFilters"></CoachesBar>
  <BaseCard>
    <div class="controls">
      <BaseButton type="button" mode="outline" @click="loadCoaches(true)"
        >Refresh</BaseButton
      >
      <BaseButton
        type="link"
        to="/auth?redirect=register"
        v-if="!isLoggedIn"
        mode="flat"
        >Login to Register as Coach</BaseButton
      >
      <BaseButton
        v-if="isLoggedIn && !isCoach && !isLoading"
        type="link"
        mode="flat"
        to="/register"
        >Register as Coach</BaseButton
      >
    </div>
    <BaseSpinner v-if="isLoading"></BaseSpinner>
    <ul v-else-if="checkExistCoach">
      <CoachItem
        v-for="coach in coaches"
        :key="coach.id"
        :id="coach.id"
        :fullname="coach.fullName"
        :money-in-hour="coach.moneyInHour"
        :tags="coach.tags"
      ></CoachItem>
    </ul>
    <h3 v-else>No coaches</h3>
  </BaseCard>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import { mapGetters } from "vuex";
import CoachesBar from "../../components/coaches/CoachesBar.vue";
export default {
  components: { CoachItem, CoachesBar },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        devops: true,
      },
    };
  },
  computed: {
    ...mapGetters("coaches", ["isCoach"]),
    coaches() {
      const coaches = this.$store.getters["coaches/getAccessToCoaches"];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.tags.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.tags.includes("backend")) {
          return true;
        }
        if (this.activeFilters.devops && coach.tags.includes("devops")) {
          return true;
        }
        return false;
      });
    },

    checkExistCoach() {
      return !this.isLoading && this.$store.getters["coaches/checkExistCoach"];
    },

    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },

  created() {
    this.loadCoaches();
  },

  methods: {
    setFilters(updatedTagFilters) {
      this.activeFilters = updatedTagFilters;
    },

    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },

    handlerError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
}

.controls {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
}
</style>
