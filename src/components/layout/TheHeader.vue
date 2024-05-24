<template>
  <header>
    <nav>
      <h1><RouterLink to="/">Find a Coach</RouterLink></h1>
      <div class="container">
        <!-- prettier-ignore -->
        <RouterLink to="/coaches">All Coaches</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/requests">Requests</RouterLink>
        <RouterLink v-else to="/auth">Login</RouterLink>
        <BaseButton @click="logout" mode="flat" type="button" v-if="isLoggedIn"
          >Logout</BaseButton
        >
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/coaches");
    },
  },
};
</script>

<style scoped>
header {
  background-color: var(--primary);
  color: var(--second);
  padding: 20px clamp(20px, 5vw, 100px);
}

nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

a {
  padding: 10px;
  border: 1px solid transparent;
  transition: border 0.3s ease-in-out;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.container a {
  font-size: 20px;
  color: var(--pink);
  padding: 10px 20px;
}

.container a:is(.router-link-active, :hover, :active) {
  border-color: var(--pink);
}

h1 {
  align-self: center;
}

h1 > a {
  font-size: 25px;
  color: var(--second);
}

@media (width < 500px) {
  nav {
    justify-content: center;
    gap: 20px;
  }

  .container {
    justify-content: center;
    gap: 10px;
  }
}
</style>
