<template>
  <v-container>
    <br />
    <v-row>
      <v-col class="lg-4">
        <h2>Gráfico de Vendas</h2>
        <br />
        <template slot="header">
          <h5 class="card-category">{{ "dashboard.totalShipments" }}</h5>
        </template>
        <div class="chart-area">
          <line-chart
            style="height: 100%"
            chart-id="purple-line-chart"
            :chart-data="purpleLineChart.chartData"
            :gradient-colors="purpleLineChart.gradientColors"
            :gradient-stops="purpleLineChart.gradientStops"
            :extra-options="purpleLineChart.extraOptions"
          >
          </line-chart>
        </div>
      </v-col>
      <v-col class="lg-4">
        <h2>Gráfico de Financeiro</h2>
        <br />
        <template slot="header">
          <h5 class="card-category">{{ "dashboard.completedTasks" }}</h5>
        </template>
        <div class="chart-area">
          <line-chart
            style="height: 100%"
            chart-id="green-line-chart"
            :chart-data="greenLineChart.chartData"
            :gradient-stops="greenLineChart.gradientStops"
            :extra-options="greenLineChart.extraOptions"
          >
          </line-chart>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import LineChart from "./Charts/LineChart";
import BarChart from "./Charts/BarChart";
import * as chartConfigs from "./Charts/config";
import config from "./config";

export default {
  components: {
    LineChart,
    BarChart,
  },
  data() {
    return {
      purpleLineChart: {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: [
            "JAN",
            "FEV",
            "MAR",
            "ABR",
            "MAI",
            "JUN",
            "JUL",
            "AGO",
            "SET",
            "OUT",
            "NOV",
            "DEZ",
          ],
          datasets: [
            {
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [80, 100, 70, 80, 120, 80, 80, 100, 70, 80, 120, 80],
            },
          ],
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0],
      },
      greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: [
            "JAN",
            "FEV",
            "MAR",
            "ABR",
            "MAI",
            "JUN",
            "JUL",
            "AGO",
            "SET",
            "OUT",
            "NOV",
            "DEZ",
          ],
          datasets: [
            {
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.info,
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: config.colors.info,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80, 90, 27, 60, 12, 80, 20, 50],
            },
          ],
        },
        gradientColors: [
          "rgba(66,134,121,0.15)",
          "rgba(66,134,121,0.0)",
          "rgba(66,134,121,0)",
        ],
        gradientStops: [1, 0.4, 0],
      },
    };
  },
  computed: {},
  methods: {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style>
</style>
