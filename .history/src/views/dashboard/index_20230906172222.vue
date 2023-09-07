<template>
  <div>
    <Card></Card>
    <Sale></Sale>
    <Observe></Observe>
  </div>
</template>

<script>
import Observe from "./Observe";
import Card from "./Card/index.vue";
import Sale from "./Sale";
export default {
  components: {
    Card,
    Sale,
    Observe,
  },
  mounted() {
    this.$store.dispatch
  },
};
</script>

<style scoped></style>
