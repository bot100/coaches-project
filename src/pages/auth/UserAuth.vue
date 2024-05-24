<template>
  <BaseCard>
    <BaseDialog :show="!!error" title="An error occurred" @close="handlerError">
      <p>{{ error }}</p>
    </BaseDialog>
    <BaseDialog :show="isLoading" title="Authenticating..." fixed>
      <BaseSpinner></BaseSpinner>
    </BaseDialog>
    <BaseForm @submit.prevent="submitForm">
      <BaseFormItem :class="{ invalid: !email.isValid }">
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="john@gmail.com"
          v-model.trim="email.value"
          @blur="clearValidity(email)"
        />
        <p v-if="!email.isValid">Email must not be empty.</p>
      </BaseFormItem>
      <BaseFormItem :class="{ invalid: !password.isValid }">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          maxlength="6"
          v-model.trim="password.value"
          @blur="clearValidity(password)"
        />
        <p v-if="!password.isValid">
          Password must not be empty or equal to length in six.
        </p>
      </BaseFormItem>
      <BaseButton type="button">{{ submitButtonCaption }}</BaseButton>
    </BaseForm>
    <hr />
    <BaseButton type="button" mode="flat" @click="switchAuthMode">{{
      switchModeButtonCaption
    }}</BaseButton>
  </BaseCard>
</template>

<script>
export default {
  inject: ['clearValidity'],
  data() {
    return {
      email: {
        value: '',
        isValid: true,
      },

      password: {
        value: '',
        isValid: true,
      },

      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },

  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') return 'Login';
      else return 'Sign Up';
    },

    switchModeButtonCaption() {
      if (this.mode === 'login') return 'Sign Up instead';
      else return 'Login instead';
    },
  },

  methods: {
    validate() {
      this.formIsValid = true; // clear errors

      if (this.email.value === '' || !this.email.value.includes('@')) {
        this.email.isValid = false;
        this.formIsValid = false;
      }

      if (this.password.value === '' || this.password.value.length < 5) {
        this.password.isValid = false;
        this.formIsValid = false;
      }
    },

    async submitForm() {
      this.validate();

      if (!this.formIsValid) return;

      this.isLoading = true;

      const payload = {
        email: this.email.value,
        password: this.password.value,
      };

      try {
        if (this.mode === 'login') await this.$store.dispatch('login', payload);
        else await this.$store.dispatch('signup', payload);
        const redirectUrl = `/${this.$route.query.redirect || 'coaches'}`;
        this.$router.replace(redirectUrl);
      } catch (error) {
        this.error = error.message || 'Failed to authenticate, try later.';
      }

      this.isLoading = false;
    },

    switchAuthMode() {
      if (this.mode === 'login') this.mode = 'signup';
      else this.mode = 'login';
    },

    handlerError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
hr {
  margin-block-start: 20px;
  height: 1px;
  background-color: #000;
  border: unset;
}
</style>
