<template>
  <v-container text-xs-center grid-list-lg>
    <br />
    <v-card height="479" width="220" class="bar">
      <v-col md="12">
        <router-link :to="rota">
          <v-btn color="orange" depressed dark>
            <v-icon class="iconText">mdi-plus</v-icon>
            <div class="btnText">Nova Venda</div>
          </v-btn>
        </router-link>

        <v-list dense class="mainText">
          <v-list-item-group
            v-model="selectedItem"
            color="black"
            v-for="item in items"
            :key="item.link"
            link
          >
            <router-link :to="item.title">
              <v-list-item v-model="selectedItem">
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-card>
  </v-container>
</template>

<script>
import app from "../../app.vue";
export default {
  components: { app },
  data() {
    return {
      rota: "newsale",
      selectedItem: {},
      items: [
        { title: "Painel" },
        { title: "Vendas" },
        { title: "Compras" },
        { title: "Clientes" },
        { title: "Serviços" },
        { title: "Financeiro" },
        { title: "Estoque" },
        { title: "Histórico" },
        { title: "Configurações" },
      ],
      right: null,
    };
  },
};
</script>

<style scoped>
.bar {
  margin-top: -10px;
  margin-left: 10px;
}

.btnText {
  margin-right: 55px;
  font-weight: 500;
  font-size: 12px;
}

.cardText {
  cursor: pointer;
  margin: -25px;
  font-size: 14px;
}

.flex {
  align-content: left;
}

.iconText {
  margin-left: -7px;
}

.mainText {
  margin-top: 15px;
  width: 190px;
}

a {
  text-decoration: none;
}
</style>
