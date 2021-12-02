import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../components/Login/Login";
import Layout from "../components/Layout/Layout";
import Painel from "../components/Dashboard/Dashboard"
import NewSale from "../components/NewSale/NewSale";
import SalesReport from "../components/Sales/SalesReport"
import PurchaseReport from "../components/Purchase/PurchaseReport"
import Inventory from "../components/Invetory/Invetory"

Vue.use(VueRouter);

const routes = [{
    path: "/",
    component: Login,
  },
  {
    path: "/Layout",
    component: Layout,
    children: [{
        path: "/NewSale",
        component: NewSale,
      },
      {
        path: "/Painel",
        component: Painel,
      },
      {
        path: "/Vendas",
        component: SalesReport,
      },
      {
        path: "/Compras",
        component: PurchaseReport,
      },
      {
        path: "/Estoque",
        component: Inventory,
      },
      {
        path: "/Clientes",
        component: Painel,
      },
      {
        path: "/Serviços",
        component: Painel,
      },
      {
        path: "/Financeiro",
        component: Painel,
      },
      {
        path: "/Histórico",
        component: Painel,
      },
      {
        path: "/Configurações",
        component: Painel,
      },
    ]
  },
];

const router = new VueRouter({
  routes,
});

export default router;