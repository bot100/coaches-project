<template>
  <li class="wrapper">
    <article>
      <h6>{{ fullname }}</h6>
      <small class="money-in-hour">{{ `$${moneyInHour}/hour` }}</small>
      <div class="container-tags">
        <div class="tags">
          <BaseBadge :class-name="tag" v-for="(tag, i) in tags" :key="i">{{
            tag
          }}</BaseBadge>
        </div>
      </div>
      <div class="actions">
        <BaseButton type="link" :to="linkContact" mode="outline"
          >Contact</BaseButton
        >
        <BaseButton type="link" :to="linkDetails" mode="flat"
          >View Details</BaseButton
        >
      </div>
    </article>
    <RouterView></RouterView>
  </li>
</template>

<script>
export default {
  props: ['id', 'fullname', 'money-in-hour', 'tags'],
  computed: {
    linkContact() {
      return `${this.$route.path}/${this.id}/contact`;
    },
    linkDetails() {
      return `${this.$route.path}/${this.id}`;
    },
  },
};

// this.$route.path - current path
</script>

<style scoped>
li.wrapper {
  border: 1px solid #000;
  border-radius: 10px;
  padding: 25px;
}

article {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h6 {
  font-size: 25px;
}

small {
  font-weight: bold;
  font-size: 16px;
}

div.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.actions {
  align-self: end;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>

<!--

  if we use children path then we must use router view because it will not be loaded to replace the route that was on the screen previously but that instead it needs a new router view.

-->
