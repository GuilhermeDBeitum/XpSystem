import Vue from "vue";
import axios from "axios";
import Vuex from "vuex";
Vue.use(Vuex);

const SET_ID = "SET_ID";
const SET_LOGIN = "SET_LOGIN";
const SET_PASSWORD = "SET_PASSWORD";
const SET_AUTH = "SET_AUTH";
const SET_SALES = "SET_SALES";
const SET_PRODUCTS = "SET_PRODUCTS";
const SET_PRODUCT_NAME = "SET_PRODUCT_NAME";
const SET_SALLER_NAME = "SET_SALLER_NAME";
const SET_AMOUNT = "SET_AMOUNT";
const SET_PRICE = "SET_PRICE";
const SET_IMG = "SET_IMG";
const SET_ITEM = "SET_ITEM";
const SET_EDITED_INDEX = "SET_EDITED_INDEX";
const SET_LOADING = "SET_LOADING";
const SET_SAVEDIALOG = "SET_SAVEDIALOG";
const SET_SALEDIALOG = "SET_SALEDIALOG";
const SET_IMGDIALOG = "SET_IMGDIALOG";
const SET_ABOUTDIALOG = "SET_ABOUTDIALOG";
const SET_EXITDIALOG = "SET_EXITDIALOG";

const moduleInfo = {
  state: {
    id: null,
    login: null,
    password: null,
    auth: null,
    products: [],
    sales: [],
    img: "",
    Product_name: "",
    saller_name: "",
    amount: null,
    price: null,
    saveDialog: false,
    saleDialog: false,
    imgDialog: false,
    exitDialog: false,
    aboutDialog: false,
    item: {},
    editedIndex: -1,
    loading: false,
  },
  getters: {
    id: (state) => {
      return state.id;
    },
    login: (state) => {
      return state.login;
    },
    password: (state) => {
      return state.password;
    },
    auth: (state) => {
      return state.auth;
    },
    sales: (state) => {
      return state.sales;
    },
    products: (state) => {
      return state.products;
    },
    saller_name: (state) => {
      return state.saller_name;
    },
    product_name: (state) => {
      return state.product_name;
    },
    amount: (state) => {
      return state.amount;
    },
    price: (state) => {
      return state.price;
    },
    img: (state) => {
      return state.img;
    },
    item: (state) => {
      return state.item;
    },
    editedIndex: (state) => {
      return state.editedIndex;
    },
    loading: (state) => {
      return state.loading;
    },
    saveDialog: (state) => {
      return state.saveDialog;
    },
    saleDialog: (state) => {
      return state.saleDialog;
    },
    imgDialog: (state) => {
      return state.imgDialog;
    },
    aboutDialog: (state) => {
      return state.aboutDialog;
    },
    exitDialog: (state) => {
      return state.exitDialog;
    },
  },
  mutations: {
    [SET_ID](state, id) {
      state.id = id;
    },
    [SET_LOGIN](state, login) {
      state.login = login;
    },
    [SET_PASSWORD](state, password) {
      state.password = password;
    },
    [SET_AUTH](state, auth) {
      state.auth = auth;
    },
    [SET_SALES](state, sales) {
      state.sales = sales;
    },
    [SET_PRODUCTS](state, products) {
      state.products = products;
    },
    [SET_SALLER_NAME](state, saller_name) {
      state.saller_name = saller_name;
    },
    [SET_PRODUCT_NAME](state, product_name) {
      state.product_name = product_name;
    },
    [SET_AMOUNT](state, amount) {
      state.amount = amount;
    },
    [SET_PRICE](state, price) {
      state.price = price;
    },
    [SET_IMG](state, img) {
      state.img = img;
    },
    [SET_ITEM](state, item) {
      state.item = item;
    },
    [SET_EDITED_INDEX](state, editedIndex) {
      state.editedIndex = editedIndex;
    },
    [SET_LOADING](state, loading) {
      state.loading = loading;
    },
    [SET_SAVEDIALOG](state, saveDialog) {
      state.saveDialog = saveDialog;
    },
    [SET_SALEDIALOG](state, saleDialog) {
      state.saleDialog = saleDialog;
    },
    [SET_IMGDIALOG](state, imgDialog) {
      state.imgDialog = imgDialog;
    },
    [SET_ABOUTDIALOG](state, aboutDialog) {
      state.aboutDialog = aboutDialog;
    },
    [SET_EXITDIALOG](state, exitDialog) {
      state.exitDialog = exitDialog;
    },
  },
  actions: {
    async initializeProduct({ state }) {
      state.loading = true;
      axios
        .get("http://localhost:3000/products")
        .then((response) => {
          state.products = response.data;
          state.loading = false;
        })
        .catch(() => {
          Vue.toasted.error(
            "Something is wrong and we are already solving it, try again later!!"
          );
        });
    },

    async initializeSale({ state }) {
      axios
        .get("http://localhost:3000/sales")
        .then((response) => {
          state.sales = response.data;
        })
        .catch(() => {
          Vue.toasted.error(
            "Something is wrong and we are already solving it, try again later!!"
          );
        });
    },

    async getProduct({ state }) {
      axios
        .get(`https://localhost:3000/${state.item.id}`)
        .then((response) => {
          state.products = response.data;
        })
        .catch(() => {
          Vue.toasted.error(
            "Something is wrong and we are already solving it, try again later!"
          );
        });
    },

    async getSale({ state }) {
      axios
        .get(`https://localhost:3000/${state.item.id}`)
        .then((response) => {
          state.sales = response.data;
        })
        .catch(() => {
          Vue.toasted.error(
            "Something is wrong and we are already solving it, try again later!"
          );
        });
    },

    async saveProduct({ dispatch, state }) {
      if (state.editedIndex > -1) {
        axios
          .put(`http://localhost:3000/products/${state.id}`, {
            id: state.id,
            product_name: state.product_name,
            amount: state.amount,
            price: state.price,
            img: state.img,
          })
          .then(() => {
            return dispatch("initializeProducts");
          })
          .catch(() => {
            Vue.toasted.error(
              "Something is wrong and we are already solving it, try again later!"
            );
          });
      } else {
        axios
          .post(`http://localhost:3000/products/`, {
            product_name: state.product_name,
            amount: state.amount,
            price: state.price,
            img: state.img,
          })
          .then(() => {
            return dispatch("initializeProducts");
          })
          .catch(() => {
            Vue.toasted.error(
              "Something is wrong and we are already solving it, try again later!"
            );
          });
      }
    },

    async saveSale({ dispatch, state }) {
      axios
        .post(`http://localhost:3000/sales/`, {
          product_name: state.product_name,
          amount: state.amount,
          price: state.price,
        })
        .then(() => {
          return dispatch("initializeSale");
        })
        .catch(() => {
          Vue.toasted.error(
            "Something is wrong and we are already solving it, try again later!"
          );
        });
    },

    async deleteProduct({ dispatch, state }) {
      axios
        .delete(`http://localhost:3000/products/${state.item.id}`)
        .then(() => {
          return dispatch("initializeProducts");
        })
        .catch(() => {
          Vue.toasted.error(
            "Something is wrong and we are already solving it, try again later!"
          );
        });
    },

    async deleteSale({ dispatch, state }) {
      axios
        .delete(`http://localhost:3000/sales/${state.item.id}`)
        .then(() => {
          return dispatch("initializeSale");
        })
        .catch(() => {});
    },
  },
};

const store = new Vuex.Store({
  modules: {
    modinfo: moduleInfo,
  },
});

export default store;
