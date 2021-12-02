<template>
  <v-container text-xs-center grid-list-lg>
    <br />
    <br />
    <v-card class="mx-auto">
      <v-layout row wrap>
        <v-spacer></v-spacer>
        <v-flex class="black--text" sm12 md4>
          <v-col class="white text-center" cols="12">
            <v-select
              color="orange"
              class="dates"
              :items="dates"
              v-model="selectedDate"
              @input="setDates()"
              @click:clear="
                startDate = null;
                endDate = null;
              "
              light
              hide-details
              label="Data"
              solo
              clearable
            >
              <template v-slot:item="{ item }">
                <template
                  v-if="
                    item.value === selectedDate &&
                    item.value === 'intervalo' &&
                    startDate &&
                    endDate &&
                    !showSelectDate
                  "
                >
                  <span class="grow">
                    {{ startDate | dateFormat("DD/MM/YYYY") }} —
                    {{ endDate | dateFormat("DD/MM/YYYY") }}
                  </span>
                  <v-icon>refresh</v-icon>
                </template>

                <template v-else>{{ item.text }}</template>
              </template>
              <template v-slot:selection="{ item }">
                <span
                  v-if="
                    item.value === selectedDate &&
                    item.value === 'intervalo' &&
                    startDate &&
                    endDate &&
                    !showSelectDate
                  "
                >
                  {{ startDate | dateFormat("DD/MM/YYYY") }}-{{
                    endDate | dateFormat("DD/MM/YYYY")
                  }}
                </span>
                <span v-else>{{ item.text }}</span>
              </template>
            </v-select>
          </v-col>
        </v-flex>

        <v-container>
          <template>
            <v-card light>
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
            </v-card>
          </template>

          <div id="grafico_volume" align="center" justify="space-around">
            <div ref="print">
              <hr />
              <br />
              <h3 class="black--text font-weight-black">
                RELATÓRIO DE COMPRAS
              </h3>
              <br />
              <hr />

              <v-data-table
                :headers="headers"
                :items="this.items"
                :search="search"
              >
              </v-data-table>
            </div>
          </div>
        </v-container>
      </v-layout>
    </v-card>
    <v-dialog
      :value="showSelectDate"
      @input="showSelectDate = false"
      @keydown.esc="showSelectDate = false"
      v-model="showSelectDate"
      persistent
      full-width
      :width="$vuetify.breakpoint.smAndUp ? '290px' : '290px'"
    >
      <v-window touchless v-model="currentDateSelector">
        <v-window-item value="startDate">
          <v-card-text class="white text-xs-center headline"
            >Data inicial</v-card-text
          >
          <v-date-picker
            :max="hoje"
            v-model="startDate"
            :scrollable="false"
            header-color="white"
            class="header-date-picker"
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="orange"
              @click="
                currentDateSelector = 'endDate';
                endDate = startDate;
              "
              >próximo</v-btn
            >
          </v-date-picker>
        </v-window-item>
        <v-window-item value="endDate">
          <v-card-text class="white text-xs-center headline"
            >Data final</v-card-text
          >
          <v-date-picker
            :min="startDate"
            :max="hoje"
            v-model="endDate"
            :scrollable="false"
            header-color="white"
            class="header-date-picker"
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="orange"
              @click="currentDateSelector = 'startDate'"
              >Voltar</v-btn
            >
            <v-btn
              text
              color="orange"
              @click="
                showSelectDate = false;
                loadItems();
              "
              >Concluir</v-btn
            >
          </v-date-picker>
        </v-window-item>
      </v-window>
    </v-dialog>
  </v-container>
</template>
<script>
import XLSX from "xlsx";
var moment = require("moment-timezone");

export default {
  name: "PurchaseReport",
  props: ["parent"],
  data() {
    return {
      loading: false,
      hoje: moment().format("YYYY-MM-DD"),
      currentDateSelector: "startDate",
      showSelectDate: false,
      dates: [
        { text: "Hoje", value: "hoje" },
        { text: "Ontem", value: "ontem" },
        { text: "Este mês", value: "este_mes" },
        { text: "Mês anterior", value: "mes_anterior" },
        { text: "Este ano", value: "este_ano" },
        { text: "Definir data", value: "intervalo" },
      ],
      selectedDate: "mes_anterior",
      startDate: null,
      endDate: null,
      search: "",
      items: [],
    };
  },
  computed: {
    headers() {
      return [
        {
          align: "start",
          text: "Data",
          value: "data",
          width: 100,
        },
        {
          text: "Produtos",
          value: "product",
          width: 200,
        },
        {
          text: "1º Trim.",
          value: "1Quarter",
          width: 100,
        },
        {
          text: "2º Trim",
          value: "2Quarter",
          width: 100,
        },
        {
          text: "3º Trim",
          value: "3Quarter",
          width: 100,
        },
        {
          text: "4º Trim",
          value: "4Quarter",
          width: 100,
        },
        {
          text: "Total",
          value: "total",
          width: 100,
        },
      ];
    },
  },

  methods: {
    exportExcel1() {
      let data = XLSX.utils.json_to_sheet(this.items);
      const workbook = XLSX.utils.book_new();
      const filename = "XP";
      XLSX.utils.book_append_sheet(workbook, data, filename);
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    },

    downloadWord() {
      var vm = this,
        print = `<html xmlns:o='urn:schemas-microsoft-com:office:office xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>${vm.print}</body></html>`;

      var source =
        "data:application/vnd.ms-word;charset=utf-8," +
        encodeURIComponent(print);
      var fileDownload = document.createElement("a");
      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = "document.doc";
      fileDownload.click();
      document.body.removeChild(fileDownload);
    },

    cancelSelectDate() {
      this.showSelectDate = false;
      this.selectedDate = "hoje";
    },
    setDates() {
      switch (this.selectedDate) {
        case "hoje":
          if (this.items) {
            this.startDate = this.endDate = moment()
              .subtract(0, "days")
              .format("YYYY-MM-DD");
          } else {
            this.selectedDate = "";
          }
          break;
        case "ontem":
          if (this.items) {
            this.startDate = this.endDate = moment()
              .subtract(1, "days")
              .format("YYYY-MM-DD");
          } else {
            this.selectedDate = "";
          }

          break;
        case "este_mes":
          if (this.items) {
            this.startDate = moment().startOf("month").format("YYYY-MM-DD");
            this.endDate = moment().endOf("month").format("YYYY-MM-DD");
          } else {
            this.selectedDate = "";
          }
          break;
        case "mes_anterior":
          if (this.items) {
            this.startDate = moment()
              .subtract(1, "month")
              .startOf("month")
              .format("YYYY-MM-DD");
            this.endDate = moment()
              .subtract(1, "month")
              .endOf("month")
              .format("YYYY-MM-DD");
          } else {
            this.selectedDate = "";
          }
          break;
        case "este_ano":
          if (this.items) {
            this.startDate = moment().startOf("year").format("YYYY-MM-DD");
            this.endDate = moment().endOf("year").format("YYYY-MM-DD");
          } else {
            this.selectedDate = "";
          }
          break;
        case "intervalo":
          if (this.items) {
            this.currentDateSelector = "startDate";
            this.startDate = moment().format("YYYY-MM-DD");
            this.endDate = null;
            this.showSelectDate = true;
          } else {
            this.selectedDate = "";
          }
          break;
        default:
          break;
      }
    },

    dateIsoToBr(isoDate) {
      return isoDate ? isoDate.split("-").reverse().join("/") : "";
    },
    formatHour(hour) {
      return hour ? hour.split(":").splice(0, 2).join(":") : "";
    },

    formatData(data) {
      ""("undefined -> ", data);
    },

    // async loadItems() {
    //   if (!this.startDate || !this.endDate) {
    //     this.items = [];
    //     return;
    //   }

    //   try {
    //     this.loading = true;
    //     let response = await this.$axios.post,
    //       this.$qs.stringify({
    //         data_ini: this.dateIsoToBr(this.startDate),
    //         data_fim: this.dateIsoToBr(this.endDate),
    //       }),
    //       {
    //         headers: {
    //           "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    //         },
    //       }
    //     );

    //     let data = await response.data;
    //     if (typeof data !== "string") {
    //       // data.forEach(data => {
    //       //    data.signature = this.validasignature(data.signature);
    //       // });

    //       this.items = data;
    //     } else {
    //       this.$snotify.error(
    //         "Oops, ocorreu um erro ao carregar o relatório!",
    //         "Atenção"
    //       );
    //     }
    //   } catch (error) {
    //     ""(error);
    //   } finally {
    //     this.loading = false;
    //   }
    // },
  },

  watch: {},
  filters: {
    integer: function (value) {
      if (!value) return "";
      value = parseInt(value);
      return value.toFixed(0);
    },
    dateFormat: function (value, opts) {
      return moment(value).format(opts);
    },
  },
};
</script>

<style>
.dates {
  font-weight: 500;
}
</style>
