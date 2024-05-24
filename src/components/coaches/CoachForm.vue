<template>
  <BaseForm @submit.prevent="submitForm">
    <template #main>
      <BaseFormItem :class="{ invalid: !fullName.isValid }">
        <label for="fullname">Fullname</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          v-model.trim="fullName.value"
          placeholder="John Konan"
          @blur="clearValidity(fullName)"
        />
        <p v-if="!fullName.isValid">Fullname must not be empty.</p>
      </BaseFormItem>

      <BaseFormItem>
        <label for="description">Description</label>
        <textarea
          type="text"
          id="description"
          name="description"
          rows="6"
          v-model.trim="description"
        />
      </BaseFormItem>

      <BaseFormItem :class="{ invalid: !moneyInHour.isValid }">
        <label for="rate">Hourly Rate</label>
        <input
          type="number"
          id="rate"
          name="rate"
          v-model.number="moneyInHour.value"
          placeholder="30"
          min="1"
          max="1000"
          @blur="clearValidity(moneyInHour)"
        />
        <p v-if="!moneyInHour.isValid">Rate must be greater than 0.</p>
      </BaseFormItem>

      <BaseFormItem :class="{ invalid: !tags.isValid }">
        <h4>Areas of Expertise</h4>
        <div class="checkbox-item">
          <input
            type="checkbox"
            id="frontend"
            name="frontend"
            value="frontend"
            v-model="tags.value"
            @blur="clearValidity(tags)"
          /><label for="frontend">Frontend Development</label>
        </div>
        <div class="checkbox-item">
          <input
            type="checkbox"
            id="backend"
            name="backend"
            value="backend"
            v-model="tags.value"
            @blur="clearValidity(tags)"
          /><label for="backend">Backend Development</label>
        </div>
        <div class="checkbox-item">
          <input
            type="checkbox"
            id="devops"
            name="devops"
            value="devops"
            v-model="tags.value"
            @blur="clearValidity(tags)"
          />
          <label for="devops">DevOps Development</label>
        </div>
        <p v-if="!tags.isValid">At least one expertise must be selected.</p>
      </BaseFormItem>
    </template>
    <template #default>
      <div class="block">
        <p v-if="!formIsValid" :class="{ warning: !formIsValid }">
          Please fix the above errors and submit again.
        </p>

        <BaseButton type="button" mode="flat">Register</BaseButton>
      </div>
    </template>
  </BaseForm>
</template>

<script>
export default {
  inject: ['clearValidity'],
  emits: ['data-in-come'],
  data() {
    return {
      fullName: {
        value: '',
        isValid: true,
      },
      description: '',
      moneyInHour: {
        value: null,
        isValid: true,
      },
      tags: {
        value: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },

  methods: {
    validate() {
      this.formIsValid = true;

      if (this.fullName.value === '') {
        this.fullName.isValid = false;
        this.formIsValid = false;
      }

      if (!this.moneyInHour.value || this.moneyInHour.value < 0) {
        this.moneyInHour.isValid = false;
        this.formIsValid = false;
      }

      if (this.tags.value.length === 0) {
        this.tags.isValid = false;
        this.formIsValid = false;
      }
    },

    submitForm() {
      this.validate();

      if (!this.formIsValid) return;

      this.$emit('data-in-come', {
        fullName: this.fullName.value,
        moneyInHour: this.moneyInHour.value,
        tags: this.tags.value,
        description: this.description || 'Nothing in description!',
      });
    },
  },
};
</script>

<style scoped>
.checkbox-item {
  display: flex;
  gap: 5px;
}

button {
  margin-block-start: 10px;
}
</style>
