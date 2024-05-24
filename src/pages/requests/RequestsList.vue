<template>
  <section>
    <BaseDialog :show="!!error" title="An error ocurred!" @close="handlerError">
      <p>{{ error }}</p>
    </BaseDialog>
    <BaseCard>
      <div class="header">
        <h2>Requests Received</h2>
      </div>
      <BaseSpinner v-if="isLoading"></BaseSpinner>
      <ul v-else-if="hasRequests && !isLoading">
        <RequestItem
          v-for="request in requests"
          :key="request.id"
          :email="request.email"
          :message="request.message"
        ></RequestItem>
      </ul>
      <h3 v-else>You haven't received any requests yet!</h3>
    </BaseCard>
  </section>
</template>

<script>
import RequestItem from "../../components/requests/RequestItem.vue";
export default {
  components: { RequestItem },

  data() {
    return {
      isLoading: false,
      error: null,
    };
  },

  computed: {
    requests() {
      const requests = this.$store.getters["requests/stateRequests"];
      return requests;
    },

    hasRequests() {
      return !this.isLoading && this.$store.getters["requests/hasRequests"];
    },
  },

  created() {
    this.loadRequests();
  },

  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("requests/loadRequests");
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
h2,
h3 {
  text-align: center;
  padding: 10px;
}

h2 {
  font-size: 30px;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
