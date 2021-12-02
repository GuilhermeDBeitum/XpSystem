<template>
  <v-card height="500">
    <v-card color="#e7ebf1">
      <v-container class="d-flex justify-center">
        <img
          height="120px"
          :src="require('../../../../assets/images/logo.png')"
        />
      </v-container>
    </v-card>
    <v-container>
      <v-col cols="12" sm="4"></v-col>
      <v-col cols="12" sm="4"></v-col>
      <v-col cols="12" sm="4"></v-col>

      <v-row align="center" justify="space-around">
        <v-col class="text-center" cols="12" sm="4">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              filled
              autocomplete="off"
              v-model="login"
              :rules="[rules.required, rules.email]"
              label="Login"
              :prepend-icon="'mdi-login'"
              color="orange"
            ></v-text-field>
            <v-text-field
              autocomplete="off"
              filled
              v-model="password"
              label="Password"
              :type="show1 ? 'text' : 'password'"
              :rules="[rules.required]"
              name="input-10-2"
              class="input-group--focused"
              @click:append="show1 = !show1"
              :prepend-icon="'mdi-lock'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              color="orange"
            ></v-text-field>
          </v-form>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="12" sm="4"></v-col>
        <v-col class="text-center" cols="12" sm="4">
          <router-link :to="rota">
            <v-btn
              class="white--text"
              color="orange"
              @click="
                validate();
                validateLogin();
              "
              >Login</v-btn
            >
          </router-link>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar
      color="red"
      absolute
      top
      multi-line
      vertical
      tag
      hide-details
      text
      shaped
      elevation="24"
      class="text-center ma-2"
      v-model="bar"
    >
      {{ print }}
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  props: {},

  data: () => ({
    rota: "",
    print: "Incorrect Login or Password! Try again.",
    valid: true,
    bar: false,
    show1: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      counter: (value) => value.length <= 20 || "Max 20 characters",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),

  computed: {
    login: {
      get() {
        return this.$store.state.modinfo.login;
      },

      set(newLogin) {
        this.$store.commit("SET_LOGIN", newLogin);
      },
    },

    password: {
      get() {
        return this.$store.state.modinfo.password;
      },

      set(newPassword) {
        this.$store.commit("SET_PASSWORD", newPassword);
      },
    },
  },

  methods: {
    validateLogin() {
      if (this.$refs.form.validate()) {
        if (
          this.login == this.$store.state.modinfo.login &&
          this.password == this.$store.state.modinfo.password
        ) {
          this.rota = "painel";
        }
      }
    },

    validate() {
      this.bar = true;
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
