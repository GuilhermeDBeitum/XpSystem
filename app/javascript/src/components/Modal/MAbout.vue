<template>
  <v-row justify="center">
    <v-dialog v-model="aboutDialog" width="340px">
      <v-card class="about">
        <v-col cols="12" md="12">
          <p>Created to help find information about.</p>
          <v-col>
            <v-row>
              <v-col cols="12" md="7">
                <h6>Designed and Developed by</h6>

                <h4>Guilherme Beitum.</h4>
              </v-col>
              <v-col cols="12" md="5"> </v-col>
            </v-row>
          </v-col>
        </v-col>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "ModalAbout",
  data() {
    return {};
  },

  computed: {
    aboutDialog: {
      get() {
        return this.$store.state.modinfo.aboutDialog;
      },

      set(newAboutDialog) {
        this.$store.commit("SET_ABOUTDIALOG", newAboutDialog);
      },
    },
  },
};
</script>

<style>
.author {
  margin: 0 auto;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  border-radius: 50%;
}

.about {
  padding: 19px;
}
</style>
