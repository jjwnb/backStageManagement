<template>
  <div>
    <Card></Card>
    <Sale></Sale>
  </div>
</template>

<script>
import moduleName from './';
import Card from "./Card/index.vue";
import Sale from "./Sale";
export default {
  components: {
    Card,
    Sale,
  },
};
</script>

<style scoped></style>
