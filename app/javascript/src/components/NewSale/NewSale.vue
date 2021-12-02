<template>
  <v-container text-xs-center grid-list-lg class="d-flex justify-center">
    <v-col cols="12" md="12">
      <Loading />
      <v-col cols="12" md="12">
        <v-card class="mx-auto">
          <v-col class="white text-center" cols="12">
            <h2 class="black--text" white--text>Produtos</h2>
          </v-col>

          <hr color="white" />
          <v-data-table
            :headers="headers"
            :items="$store.state.modinfo.products"
            :search="search"
            sort-by="Produtos"
            class="elevation-21"
            disable-sort
          >
            <template v-slot:top>
              <hr color="orange" />
              <v-toolbar flat>
                <v-spacer></v-spacer>

                <v-col cols="12" md="4">
                  <v-text-field
                    color="orange"
                    v-model="search"
                    append-icon="mdi-magnify"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-toolbar>
            </template>

            <template v-slot:item.take="{ item }">
              <v-text-field
                type="number"
                min="0"
                color="orange"
                v-model="item.take"
                v-on:blur="amount = item"
                single-line
                hide-details
              ></v-text-field>
            </template>

            <template v-slot:item.img="{ item }">
              <v-btn
                color="orange"
                class="font-weight-black"
                dark
                @click.stop="imgProduct(item)"
                x-small
                fab
              >
                <v-icon>mdi-image</v-icon>
              </v-btn>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn
                color="orange"
                class="font-weight-black"
                dark
                @click="addProduct(item)"
                x-small
                fab
              >
                <v-icon> mdi-check</v-icon>
              </v-btn>
            </template>
          </v-data-table>
          <v-col md="3">
            <v-btn
              color="orange"
              class="zdex font-weight-black"
              dark
              @click="saleDialog = true"
              bottom
              fixed
              right
              fab
              large
            >
              <v-icon>mdi-package-variant-closed</v-icon>
            </v-btn>
          </v-col>
        </v-card>
      </v-col>
      <v-row>
        <v-form ref="form"></v-form>
        <v-col>
          <v-divider class="mx-4" inset vertical></v-divider>
        </v-col>
      </v-row>
      <saleModal />
      <ImgModal />
    </v-col>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      right
      centered
      color="success"
    >
      {{ text }}
    </v-snackbar>
  </v-container>
</template>

<script>
import SaleModal from "../Modal/MSale";
import ImgModal from "../Modal/MImg";
import Loading from "../Loading";
import { mapGetters } from "vuex";
export default {
  components: { Loading, ImgModal, SaleModal },
  data: () => ({
    tab: "tab-salesman",
    search: "",
    take: 0,
    text: "Este item foi adicionado a venda, verifique a caixa!",
    snackbar: null,
    timeout: 1000,
    editedItem: {
      Product_name: "",
      amount: null,
      price: null,
    },
    headers: [
      { text: "Produto", value: "product_name", width: 200 },
      { value: "img", width: 80 },
      { text: "Qtd Total", value: "amount", width: 80 },
      { text: "Qtd", value: "take", width: 80 },
      { text: "Valor", value: "price", width: 120 },
      { value: "actions", sortable: false, width: 70 },
    ],
  }),

  computed: {
    ...mapGetters(["saleDialog"]),

    saleDialog: {
      get() {
        return this.$store.state.saleDialog;
      },

      set(newSaleDialog) {
        this.$store.commit("SET_SALEDIALOG", newSaleDialog);
      },
    },
  },

  methods: {
    async initializeTable() {
      await this.$store.dispatch("initializeProduct");
      await this.$store.dispatch("initializeSale");
    },

    async getProduct() {
      await this.$store.dispatch("getProduct");
    },

    addProduct(item) {
      this.snackbar = true;
      this.$store.state.modinfo.product_name = item.product_name;
      this.$store.state.modinfo.amount = item.take;
      this.$store.state.modinfo.price = item.price;
      this.$store.dispatch("saveSale");
    },

    imgProduct(item) {
      this.$store.state.modinfo.img = item.img;
      this.$store.state.modinfo.imgDialog = true;
    },

    async deleteProduct(item) {
      this.$store.state.modinfo.item = item;
      this.dialogDelete = false;
      await this.$store.dispatch("deleteProduct");
    },
  },

  created() {
    this.initializeTable();
  },
};
</script>
<style scoped>
.v-tab:hover {
  background-color: transparent;
  outline: double;
}

.dialogform {
  padding: 12px;
}

.box {
  padding: 23px;
}

.zdex {
  z-index: 1100;
  margin-bottom: 20px;
}
</style>
