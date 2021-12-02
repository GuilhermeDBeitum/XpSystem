<template>
  <v-app>
    <template>
      <v-main>
        <v-card height="auto">
          <router-view></router-view>
          <v-footer padless app>
            <v-col class="text-center" cols="12">
              <strong
                >&copy; XPSystem
                {{ new Date().toISOString().substr(0, 4) }}</strong
              >
            </v-col>
          </v-footer>
        </v-card>
      </v-main>
    </template>
  </v-app>
</template>

<script>
export default {
  name: `app`,
  props: {
    source: String,
  },
  components: {},

  data: () => ({
    menu: false,
  }),

  methods: {},
};
</script>
