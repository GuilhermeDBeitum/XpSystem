<template>
  <v-overlay :value="$store.state.modinfo.loading" class="zdex">
    <v-card-text>
      Loading...
      <v-progress-linear
        indeterminate
        color="orange"
        class="zdex"
      ></v-progress-linear>
    </v-card-text>
  </v-overlay>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["loading"]),

    loading: {
      get() {
        return this.$store.state.loading;
      },

      set(newLoading) {
        this.$store.commit("SET_LOADING", newLoading);
      },
    },
  },
};
</script>

<style>
</style>