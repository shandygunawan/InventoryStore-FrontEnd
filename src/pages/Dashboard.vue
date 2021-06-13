<template>
  <div class="pa-3">
    <v-row>
      <v-col class="col-sm-12 col-lg-6">
        <v-card elevation="2">
          <v-card-title>Card1</v-card-title>
          <v-card-text>
            <chart-bar
              v-if="charts_loaded"
              :chartdata="chartdata1"
              :options="options1"
            ></chart-bar>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-sm-12 col-lg-6">
        <v-card elevation="2">
          <v-card-title>Card2</v-card-title>
        </v-card>
      </v-col>
      
    </v-row>
  </div>
</template>

<script>
import ChartBar from '../components/ChartBar.vue';

const axios = require("axios");

export default {
  components: { ChartBar },
  data() {
    return {
      charts_all: null,
      charts_loaded: false,
      chartdata1: null,
      options1: null
    };
  },
  methods: {
    dynamicColor() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    },
    processChartOne(chart1_json) {
      var chart1_labels = [];
      var chart1_data = [];
      var chart1_colors = []
      for (var i = 0; i < chart1_json.length; i++) {
        chart1_labels.push(chart1_json[i]['supplier_id']);
        chart1_data.push(chart1_json[i]['total_price']);
        chart1_colors.push(this.dynamicColor());
      }
      this.chartdata1 = {
        labels: chart1_labels,
        datasets: [{
            label: 'Price (Rupiah)',
            data: chart1_data,
            backgroundColor: chart1_colors
        }]
      }
      this.options1 = { maintainAspectRatio: false } 
    },
    getChartsAll() {
      this.charts_loaded = false;
      axios.get('http://localhost:8000/igog/dashboard/')
        .then((response) => {
          this.charts_all = response.data;
          for(var key in this.charts_all) {
            this.charts_all[key] = JSON.parse(this.charts_all[key]);
          }
          this.processChartOne(this.charts_all['chart1']);
          this.charts_loaded = true;
        })
    }
  },
  created() {
    this.getChartsAll();
  }
}
</script>

<style>

</style>