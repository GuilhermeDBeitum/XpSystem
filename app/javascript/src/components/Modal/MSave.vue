<template>
  <v-dialog v-model="saveDialog" max-width="220">
    <v-card class="dialogform auto-mx">
      <v-card-title class="d-flex justify-center">
        <strong
          ><p>{{ formTitle }}</p></strong
        >
      </v-card-title>

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row class="d-flex justify-center" cols="9">
          <v-col cols="10" md="10">
            <v-text-field
              color="orange"
              v-model="$store.state.modinfo.product_name"
              label="Produto"
              :rules="rules"
              v-on:keyup.enter="validate"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="5" md="5">
            <v-text-field
              color="orange"
              type="text"
              onkeypress="return event.charCode >= 48 && event.charCode <= 57"
              v-model="$store.state.modinfo.amount"
              label="Quantidade"
              :rules="rules"
              v-on:keyup.enter="validate"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="5" md="5">
            <v-text-field
              color="orange"
              type="text"
              onkeypress="return event.charCode >= 48 && event.charCode <= 57"
              v-model="$store.state.modinfo.price"
              label="Valor"
              :rules="rules"
              v-on:keyup.enter="validate"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="11">
            <picture-input
              ref="pictureInput"
              margin="40"
              accept="image/jpeg,image/png,image/webp"
              size="42"
              :custom-strings="{
                drag: 'Arraste ou click para fazer upload',
              }"
              @change="onChange"
            >
            </picture-input>
          </v-col>
        </v-row>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-row class="box" no-gutters>
          <v-col cols="6" md="6">
            <v-btn
              width="60"
              class="black--text"
              color="white"
              @click="saveDialog = false"
              >Fechar</v-btn
            >
          </v-col>

          <v-col cols="6" md="5">
            <v-btn
              width="45px"
              class="white--text"
              color="orange"
              @click="validate()"
              ><v-icon> mdi-content-save </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import PictureInput from "vue-picture-input";
import { mapGetters } from "vuex";
export default {
  name: "MSave",
  components: {
    PictureInput,
  },
  data() {
    return {
      valid: true,
      print: "Coloque o nome do produto, quantidade ou valor!",
      errorToasted: false,
      timeout: 1600,
      obj: {},
      rules: [(v) => !!v || "Required!"],
      editedItem: {
        Product_name: "",
        amount: null,
        price: null,
      },
      defaultItem: {
        Product_name: "",
        amount: null,
        price: null,
      },
    };
  },

  computed: {
    ...mapGetters(["img"]),

    Img: {
      get() {
        return this.$store.state.modinfo.img;
      },

      set(newImg) {
        this.$store.commit("SET_IMG", newImg);
      },
    },

    saveDialog: {
      get() {
        return this.$store.state.modinfo.saveDialog;
      },

      set(newSaveDialog) {
        this.$store.commit("SET_SAVEDIALOG", newSaveDialog);
      },
    },

    formTitle() {
      return this.$store.state.modinfo.editedIndex === -1
        ? "REGISTRO"
        : "EDITAR";
    },
  },

  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate() != false) {
        this.$store.state.modinfo.saveDialog = false;
        this.$store.state.modinfo.editedItem = {};
        this.$store.dispatch("saveProduct");
      }
    },

    editProduct(item) {
      this.$store.state.modinfo.editedIndex = item.id;
      this.$store.state.modinfo.id = item.id;
      this.$store.state.modinfo.product_name = item.product_name;
      this.$store.state.modinfo.amount = item.amount;
      this.$store.state.modinfo.price = item.price;
      this.saveDialog = true;
      this.editedItem = Object.assign(item, {});
    },

    resetImput() {
      this.$store.state.modinfo.editedIndex = -1;
      this.$refs.form.reset();
    },

    onChange(image) {
      if (image) {
        this.$store.state.modinfo.img = image;

        console.log(image);
      }
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
}
</style>
