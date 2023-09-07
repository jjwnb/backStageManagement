<template>
  <div>
    <div class="card text-left">
      <img class="card-img-top" src="holder.js/100px180/" alt="">
      <div class="card-body">
        <h4 class="card-title">Title</h4>
        <p class="card-text">Body</p>
      </div>
    </div>
  </div>
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

<style scoped></style>
