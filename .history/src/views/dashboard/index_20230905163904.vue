<template>
  <div>
    <Card></Card>
    <i class="fa fa-sort-alpha-desc" aria-hidden="true"></i>
  </div>
</template>

<script>
import Card from "./Card/index.vue";
import Sale from "./Sale"
export default {
  components: {
    Card,
    Sale
  },
};
</script>

<style scoped></style>
