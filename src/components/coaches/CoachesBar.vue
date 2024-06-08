<template>
  <BaseCard class="bar">
    <h4>Find Your Coach</h4>
    <BaseForm class="bar">
      <BaseFormItem class="bar">
        <input
          type="checkbox"
          id="frontend"
          name="frontend"
          value="frontend"
          @change="setFilter"
          checked
        /><label for="frontend">Frontend</label>
      </BaseFormItem>
      <BaseFormItem class="bar">
        <input
          type="checkbox"
          id="backend"
          name="backend"
          value="backend"
          @change="setFilter"
          checked
        /><label for="backend">Backend</label>
      </BaseFormItem>
      <BaseFormItem class="bar">
        <input
          type="checkbox"
          id="devops"
          name="devops"
          value="devops"
          @change="setFilter"
          checked
        />
        <label for="devops">DevOps</label>
      </BaseFormItem>
    </BaseForm>
  </BaseCard>
</template>

<script>
export default {
  emits: ["change-filter"],
  data() {
    return {
      tagsFilter: {
        frontend: true,
        backend: true,
        devops: true,
      },
    };
  },
  methods: {
    setFilter(e) {
      const inputValue = e.target.value;
      const isActive = e.target.checked;
      const updatedTagFilters = {
        ...this.tagsFilter,
        [inputValue]: isActive,
      };
      this.tagsFilter = updatedTagFilters;
      this.$emit("change-filter", updatedTagFilters);
    },
  },
};
</script>

<style scoped>
section.bar {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

h4 {
  font-size: 22px;
}
</style>
