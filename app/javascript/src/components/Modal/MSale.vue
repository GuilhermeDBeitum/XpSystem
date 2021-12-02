<template>
  <v-dialog v-model="saleDialog" max-width="420px">
    <v-card class="d-flex justify-center">
      <h2 class="black--text" white--text>Venda</h2>
    </v-card>
    <hr color="white" />
    <v-data-table
      :headers="headers"
      :items="$store.state.modinfo.sales"
      :search="search"
      sort-by="Products"
      class="elevation-21"
      disable-sort
    >
      <template v-slot:top>
        <hr color="orange" />
        <v-form ref="form" v-model="valid" lazy-validation>
          <div v-if="tab == 'tab-salesman'">
            <v-col md="3">
              <v-btn
                color="orange"
                class="zdex my-7 elevation-18"
                dark
                @click="validate()"
                bottom
                fixed
                large
              >
                <v-icon> mdi-content-save</v-icon>
              </v-btn>
            </v-col>
            <v-form ref="form"></v-form>
            <v-col>
              <v-divider class="mx-4" inset vertical></v-divider>
            </v-col>
          </div>

          <v-toolbar flat>
            <v-col cols="6" md="6">
              <v-text-field
                color="orange"
                placeholder="Nome do Vendedor"
                append-icon="mdi-account-tie"
                v-model="$store.state.modinfo.saller_name"
                :rules="rules"
                v-on:keyup.enter="validate"
                required
              ></v-text-field>
            </v-col>

            <v-spacer></v-spacer>

            <v-col cols="6" md="4">
              <v-text-field
                color="orange"
                v-model="search"
                append-icon="mdi-magnify"
                single-line
              ></v-text-field>
            </v-col>
          </v-toolbar>
        </v-form>
      </template>

      <template v-slot:footer>
        <div v-if="$store.state.modinfo.amount">
          <hr color="orange" />
          <v-container
            text-xs-center
            grid-list-lg
            class="d-flex justify-center"
          >
            <strong
              ><p>TOTAL: R$ {{ total() }}</p></strong
            >
          </v-container>
        </div>
        <div v-else>
          <hr color="orange" />
          <v-container
            text-xs-center
            grid-list-lg
            class="d-flex justify-center"
          >
            <strong><p>TOTAL: R$ 0</p></strong>
          </v-container>
        </div>
      </template>

      <template v-slot:amount>
        <v-text-field
          color="orange"
          type="number"
          onkeypress="return event.charCode >= 48 && event.charCode <= 57"
          v-model="$store.state.modinfo.amount"
          v-on:keyup.enter="validate"
          required
        ></v-text-field>
      </template>

      <template v-slot:item.delete="{ item }">
        <v-btn
          color="red"
          class="font-weight-black"
          dark
          @click="deleteSale(item)"
          x-small
          fab
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-snackbar v-model="snackbar" :timeout="timeout" top right color="error">
      {{ text }}
    </v-snackbar>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    component: {},
    tab: "tab-salesman",
    search: "",
    valid: true,
    snackbar: false,
    text: "Este item foi excluído da venda!",
    timeout: 2000,
    obj: {},
    rules: [(v) => !!v || "Coloque um vendedor!"],
    headers: [
      { text: "Produto", value: "product_name", width: 150 },
      { text: "Quantidade", value: "amount", width: 20 },
      { text: "Valor", value: "price", width: 80 },
      { value: "delete", sortable: false, width: 20 },
    ],
  }),

  computed: {
    saleDialog: {
      get() {
        return this.$store.state.modinfo.saleDialog;
      },

      set(newSaleDialog) {
        this.$store.commit("SET_SALEDIALOG", newSaleDialog);
      },
    },
  },

  sallerName: {
    get() {
      return this.$store.state.modinfo.sallerName;
    },

    set(newSallerName) {
      this.$store.commit("SET_SELLER_NAME", newSallerName);
    },
  },

  methods: {
    total() {
      let total = [];
      const reducer = (accumulator, currentValue) => accumulator + currentValue;

      this.$store.state.modinfo.sales.forEach((i) => {
        total.push(i.price * i.amount);
      });

      if (this.$store.state.modinfo.sales[1]) {
        return total.reduce(reducer);
      } else {
        return Math.abs(total);
      }
    },

    validate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate() != false) {
        this.$store.state.modinfo.saleDialog = false;
        this.snackbar = true;
        this.$store.dispatch("getSale");
      }
    },

    async deleteSale(item) {
      this.snackbar = true;
      this.$store.state.modinfo.item = item;
      await this.$store.dispatch("deleteSale");
    },
  },
};
</script>

<style scoped>
.dialogform {
  padding: 12px;
}

.box {
  padding: 23px;
}

.zdex {
  z-index: 100;
  margin: 160px;
}
</style>
