<template>
  <div></div>
</template>

<script>
import { mapGetters } from "vuex";
import Card from "./Card/index.vue";
export default {
  components: {
    Card,
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
