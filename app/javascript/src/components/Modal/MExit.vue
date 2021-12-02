<template>
  <v-dialog v-model="exitDialog" width="145px">
    <v-card>
      <v-card-title>
        <v-flex xs12>
          <h3 class="mb-2">Atenção!</h3>
        </v-flex>
      </v-card-title>
      <v-card-text>
        <v-flex xs12 class="text-xs-center-important font-weight-black">
          Deseja Sair?
          <br />
        </v-flex>
      </v-card-text>
      <v-col md="12">
        <v-btn class="btn" color="orange darken-1" text @click="closeWindow()"
          >Sair</v-btn
        >
      </v-col>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ModalExit",
  data() {
    return {};
  },

  computed: {
    exitDialog: {
      get() {
        return this.$store.state.modinfo.exitDialog;
      },

      set(newExitDialog) {
        this.$store.commit("SET_EXITDIALOG", newExitDialog);
      },
    },
  },

  methods: {
    closeWindow() {
      window.opener = window;
      window.close();
    },
  },
};
</script>

<style>
.btn {
  width: 120px;
}
</style>
