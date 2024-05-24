<template>
  <TheHeader></TheHeader>
  <main>
    <RouterView v-slot="slotProps">
      <Transition name="section-transition" mode="out-in">
        <Component :is="slotProps.Component"></Component>
      </Transition>
    </RouterView>
  </main>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
export default {
  components: { TheHeader },
  methods: {
    clearValidity(obj) {
      if (!obj.isValid) obj.isValid = true;
      return;
    },

    autoLogin() {
      this.$store.dispatch("autoLogin");
    },
  },

  created() {
    this.autoLogin();
  },

  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },

  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace("/coaches");
      }
    },
  },

  provide() {
    return {
      clearValidity: this.clearValidity,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style-type: none;
}

:root {
  --primary: #0c359e;
  --second: #f6f5f5;
  --pink: #ee99c2;
  --yellow: #ffe3ca;
  --bordo: #7e2553;
  --purple: #492e87;
  --ocean: #1b1a55;
  --pink-2: #ffd0ec;
  --red: #d20062;
}

body {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

main {
  display: flex;
  justify-content: center;
  margin-block-start: 40px;
  margin-block-end: 50px;
}

.section-transition-enter-from,
.section-transition-leave-to {
  opacity: 0;
}

.section-transition-enter-active,
.section-transition-leave-active {
  transition: all 0.3s ease-in-out;
}

.section-transition-enter-to,
.section-transition-leave-from {
  opacity: 1;
}

.warning {
  font-size: 20px;
  color: var(--red);
}

.invalid p {
  animation: chg-c;
  animation-duration: 5s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.invalid :is(input, textarea) {
  border: 1px solid var(--red);
}

.block {
  margin-block-start: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@keyframes chg-c {
  0% {
    color: var(--red);
  }

  50% {
    color: #000;
  }

  100% {
    color: var(--red);
  }
}
</style>
