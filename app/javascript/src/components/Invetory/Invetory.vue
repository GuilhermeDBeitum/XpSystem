<template>
  <v-container text-xs-center grid-list-lg>
    <v-col cols="12" md="12">
      <Loading />
      <v-card class="mx-auto">
        <v-col class="white text-center" cols="12">
          <h2 class="black--text" white--text>Estoque</h2>
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
              @click="editProduct(item)"
              x-small
              fab
            >
              <v-icon> mdi-pencil</v-icon>
            </v-btn>

            <v-btn
              color="red"
              class="font-weight-black"
              dark
              @click="(deleteDialog = true), (obj = item)"
              x-small
              fab
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>

        <v-col md="3">
          <v-btn
            color="orange"
            class="zdex font-weight-black"
            dark
            @click="saveDialog = true"
            bottom
            fixed
            right
            fab
            large
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-card>

      <v-dialog v-model="deleteDialog" max-width="180px">
        <v-card>
          <v-card-title>
            <v-flex xs12>
              <h3 class="mb-2">Atenção!</h3>
            </v-flex>
          </v-card-title>
          <v-card-text>
            <v-flex xs12 class="text-xs-center-important font-weight-black">
              Deseja realmente excluir o produto?
              <br />
            </v-flex>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="orange darken-1" text @click="deleteDialog = false"
              >Cancel</v-btn
            >
            <v-btn color="orange darken-1" text @click="deleteProduct(obj)"
              >OK</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <SaveModal />
      <ImgModal />
    </v-col>
  </v-container>
</template>

<script>
import SaveModal from "../Modal/MSave";
import ImgModal from "../Modal/MImg";
import Loading from "../Loading";
import { mapGetters } from "vuex";
export default {
  name: "Inventory",
  components: { Loading, SaveModal, ImgModal },
  data: () => ({
    search: "",
    print: "Entre com produto, quantidade e valor!",
    deleteDialog: false,
    valid: true,
    errorToasted: false,
    timeout: 1600,
    obj: {},
    ProductRules: [(v) => !!v || "Enter the Product!"],
    amountRules: [
      (v) => !!v || "Enter the amount!",
      (v) => /.+@.+\..+/.test(v) || "Enter a valid amount address!",
    ],
    editedItem: {
      Product_name: "",
      amount: null,
      price: null,
    },
    headers: [
      { text: "Produto", value: "product_name", width: 200 },
      { value: "img", width: 80 },
      { text: "Quantidade", value: "amount", width: 80 },
      { text: "Valor", value: "price", width: 120 },
      { value: "actions", sortable: false, width: 70 },
    ],
  }),

  computed: {
    ...mapGetters(["saveDialog"]),

    saveDialog: {
      get() {
        return this.$store.state.saveDialog;
      },

      set(newSaveDialog) {
        this.$store.commit("SET_SAVEDIALOG", newSaveDialog);
      },
    },
  },

  methods: {
    async initializeProduct() {
      await this.$store.dispatch("initializeProduct");
    },

    async deleteProduct(item) {
      this.$store.state.modinfo.item = item;
      this.deleteDialog = false;
      await this.$store.dispatch("deleteProduct");
    },

    editProduct(item) {
      this.$store.state.modinfo.editedIndex = item.id;
      this.$store.state.modinfo.id = item.id;
      this.$store.state.modinfo.product_name = item.product_name;
      this.$store.state.modinfo.amount = item.amount;
      this.$store.state.modinfo.price = item.price;
      this.$store.state.modinfo.saveDialog = true;
      this.editedItem = Object.assign(item, {});
    },

    imgProduct(item) {
      this.$store.state.modinfo.img = item.img;
      this.$store.state.modinfo.imgDialog = true;
    },

    resetImput() {
      this.$store.state.modinfo.editedIndex = -1;
      this.$refs.form.reset();
    },
  },
};
</script>
<style scoped>
.tcenter {
  text-align: center;
}

.dialogform {
  padding: 12px;
}

.box {
  padding: 23px;
}

.zdex {
  z-index: 100;
}
</style>
