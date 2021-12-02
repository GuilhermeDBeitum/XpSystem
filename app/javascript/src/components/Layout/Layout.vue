<template>
  <v-app>
    <v-row no-gutters>
      <v-col cols="12" sm="12" md="12">
        <Toolbar />
      </v-col>
      <v-col cols="12" sm="12" md="3">
        <v-card color="#e7ebf1" class="card"> <Navbar /> </v-card>
      </v-col>

      <v-col cols="12" sm="12" md="9">
        <router-view></router-view>
        <div v-if="$route.params.id">
          <Dashboard />
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Navbar from "./NavBar.vue";
import Toolbar from "./Toolbar";
import Dashboard from "../Dashboard/Dashboard";
export default {
  name: `app`,
  props: {
    source: String,
  },
  components: {
    Navbar,
    Toolbar,

    Dashboard,
  },

  data: () => ({
    menu: false,
  }),
};
</script>
<style>
.card {
  margin: 15px 10px 10px 10px;
}
</style>