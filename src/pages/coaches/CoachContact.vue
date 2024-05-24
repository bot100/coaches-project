<template>
  <BaseForm @submit.prevent="submitForm">
    <template #main>
      <BaseFormItem :class="{ invalid: !email.isValid }">
        <label for="email">Your Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="john@gmail.com"
          v-model.trim="email.value"
          @blur="clearValidity(email)"
        />
        <p v-if="!email.isValid">Your email invalid!</p>
      </BaseFormItem>

      <BaseFormItem :class="{ invalid: !message.isValid }">
        <label for="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          placeholder="Some messages..."
          v-model.trim="message.value"
          @blur="clearValidity(message)"
        />
        <p v-if="!message.isValid">Create your message!</p>
      </BaseFormItem>
    </template>
    <template #default>
      <div class="block">
        <p v-if="!formIsValid" :class="{ warning: !formIsValid }">
          Please enter a valid email and non-empty message.
        </p>

        <BaseButton type="button" mode="flat">Send Message</BaseButton>
      </div>
    </template>
  </BaseForm>
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
      message: {
        value: '',
        isValid: true,
      },
      formIsValid: true,
    };
  },

  methods: {
    validate() {
      this.formIsValid = true;

      if (this.email.value === '' || !this.email.value.includes('@')) {
        this.email.isValid = false;
        this.formIsValid = false;
      }

      if (this.message.value === '') {
        this.message.isValid = false;
        this.formIsValid = false;
      }
    },

    submitForm() {
      this.validate();

      if (!this.formIsValid) return;

      this.$store.dispatch('requests/contactCoach', {
        coachID: this.$route.params.id,
        email: this.email.value,
        message: this.message.value,
      });

      this.$router.replace('/coaches');
    },
  },
};
</script>
