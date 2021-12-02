<template>
  <v-toolbar height="65px" color="#e7ebf1">
    <v-container class="d-flex justify-start">
      <img height="75px" :src="require('../../../../assets/images/logo.png')" />
    </v-container>
    <v-spacer></v-spacer>

    <v-spacer></v-spacer>

    <v-card class="perfil">
      <v-navigation-drawer mini-variant mini-variant-width="50" permanent>
        <v-list>
          <v-list-item>
            <v-tooltip v-model="show" left>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" @click.stop="aboutDialog = true">
                  <v-img
                    src="https://randomuser.me/api/portraits/women/82.jpg"
                    aspect-ratio="1"
                    width="45"
                  ></v-img>
                </v-btn>
              </template>
              <span>Perfil</span>
            </v-tooltip>
          </v-list-item>
          <v-tooltip v-model="show2" left>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                width="50"
                height="13px"
                icon
                color="gray"
                @click.stop="exitDialog = true"
                >X</v-btn
              >
            </template>
            <span>Sair</span>
          </v-tooltip>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <ModalAboult />
    <ModalExit />
  </v-toolbar>
</template>
          
<script>
import ModalExit from "../Modal/MExit";
import ModalAboult from "../Modal/MAbout";
import { mapGetters } from "vuex";
export default {
  name: `Toolbar`,
  components: {
    ModalExit,
    ModalAboult,
  },

  data: () => ({
    menu: false,
    show: false,
    show2: false,
    drawer: null,
    mini: true,
  }),

  computed: {
    ...mapGetters(["aboutDialog", "exitDialog"]),

    aboutDialog: {
      get() {
        return this.$store.state.about;
      },

      set(newAboutDialog) {
        this.$store.commit("SET_ABOUTDIALOG", newAboutDialog);
      },
    },

    exitDialog: {
      get() {
        return this.$store.state.exit;
      },

      set(newExitDialog) {
        this.$store.commit("SET_EXITDIALOG", newExitDialog);
      },
    },
  },

  methods: {},
};
</script>
          
<style>
.perfil {
  margin-left: 60px;
}
</style>