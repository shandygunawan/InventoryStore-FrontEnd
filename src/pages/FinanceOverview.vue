<template>
  <div class="pa-3">

    <v-row>
      <v-col class="col-12 col-sm-6 col-md-3">
        <v-card elevation="4">
          <v-card-title>Perhitungan Akun</v-card-title>
          <v-card-text>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Akun</th>
                    <th class="text-left">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Piutang</td>
                    <td class="green--text">{{ quick_account.outgoing_sum | currency_idr }}</td>
                  </tr>
                  <tr>
                    <td>Hutang</td>
                    <td class="red--text">{{ quick_account.incoming_sum | currency_idr }}</td>
                  </tr>
                  <tr>
                    <td><b>Total</b></td>
                    <td 
                      v-if="quick_account.outgoing_sum > quick_account.incoming_sum"
                      class="green--text"
                      >
                      <b>{{ quick_account.outgoing_sum - quick_account.incoming_sum | currency_idr }}</b>
                    </td>
                    <td 
                      v-else
                      class="red--text"
                    >
                      <b>{{ quick_account.incoming_sum - quick_account.outgoing_sum | currency_idr }}</b>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col class="col-12 col-sm-6 col-md-3">
        <v-card elevation="4" style="height:100%;">
          <v-card-title>Banyak Hutang hampir lunas</v-card-title>
          <v-card-text class="text-center">
            <v-progress-circular
              :rotate="-90"
              :size="100"
              :width="15"
              :value="payable_almost"
              color="teal"
            >
              {{ payable_almost }} %
            </v-progress-circular>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>


    <v-row>
      <v-col class="col-12 col-md-6">
        <v-card elevation="4">
          <v-card-title>Harga Barang Masuk 1 Minggu Terakhir</v-card-title>
          <v-card-text>
            Grafik Garis
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12 col-md-6">
        <v-card elevation="4">
          <v-card-title>Harga Barang Keluar 1 Minggu Terakhir</v-card-title>
          <v-card-text>
            Grafik Garis
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="col-12 col-md-6">
        <v-card elevation="4">
          <v-card-title>Top 10 Produk</v-card-title>
          <v-card-text>
            <chart-bar
              v-if="charts_loaded"
              :chartdata="chart_data['topproducts']"
              :options="chart_options['topproducts']"
            ></chart-bar>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12 col-md-6">
        <v-card elevation="4">
          <v-card-title>Top 10 Barang Keluar</v-card-title>
          <v-card-text>
            <chart-bar
              v-if="charts_loaded"
              :chartdata="chart_data['topoutgoings']"
              :options="chart_options['topoutgoings']"
            ></chart-bar>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="col-12 col-md-6">
        <v-card elevation="4">
          <v-card-title>Top 10 Supplier</v-card-title>
          <v-card-text>
            <chart-bar
              v-if="charts_loaded"
              :chartdata="chart_data['topsuppliers']"
              :options="chart_options['topsuppliers']"
            ></chart-bar>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12 col-md-6">
        <v-card elevation="4">
          <v-card-title>Top 10 Pembeli</v-card-title>
          <v-card-text>
            <chart-bar
              v-if="charts_loaded"
              :chartdata="chart_data['topbuyers']"
              :options="chart_options['topbuyers']"
            ></chart-bar>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>



  </div>
</template>

<script>
import axios from 'axios';

import ChartBar from '../components/ChartBar.vue';

export default {
  components: { ChartBar },
  data() {
    return {
      quick_account: null,
      payable_almost: null,
      topproducts: null,
      topoutgoings: null,
      topsuppliers: null,
      topbuyers: null,

      charts_loaded: false,
      chart_data: {},
      chart_options: {}
    }
  },
  methods: {
    dynamicColor() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    },
    getFinanceData() {
      axios.get('igog/finance/overview/')
        .then((response) => {          
          this.charts_loaded = false;
          this.quick_account = response.data.quick_account;
          this.payable_almost = Math.round((response.data.payable_almost.almost / response.data.payable_almost.num) * 100)
          this.topproducts = response.data.topproducts;
          this.topoutgoings = response.data.topoutgoings;
          this.topsuppliers = response.data.topsuppliers;
          this.topbuyers = response.data.topbuyers;

          this.processTopProducts();
          this.processTopOutgoings();
          this.processBarChart(this.topsuppliers, "topsuppliers", "name", "total_price");
          this.processBarChart(this.topbuyers, "topbuyers", "name", "total_price");

          this.charts_loaded = true;
        })
    },
    processBarChart(chart_json, field_name, label_name, data_name) {
      let labels = [];
      let data = [];
      let colors = []
      for (let i = 0; i < chart_json.length; i++) {
        labels.push(chart_json[i][label_name]);
        data.push(chart_json[i][data_name]);
        colors.push(this.dynamicColor());
      }
      this.chart_data[field_name] = {
        labels: labels,
        datasets: [{
            label: 'Harga',
            data: data,
            backgroundColor: colors
        }]
      }
      this.chart_options[field_name] = { 
        maintainAspectRatio: false,
      }
    },
    processTopProducts() {
      let labels = [];
      let data = [];
      let colors = []
      for (let i = 0; i < this.topproducts.length; i++) {
        labels.push(this.topproducts[i]['name']);
        data.push(this.topproducts[i]['total_price']);
        colors.push(this.dynamicColor());
      }
      this.chart_data['topproducts'] = {
        labels: labels,
        datasets: [{
            label: 'Harga',
            data: data,
            backgroundColor: colors
        }]
      }
      this.chart_options['topproducts'] = { 
        maintainAspectRatio: false,
        onClick: this.redirectProduct
      } 
    },
    processTopOutgoings() {
      let labels = [];
      let data = [];
      let colors = []
      for (let i = 0; i < this.topoutgoings.length; i++) {
        labels.push(this.topoutgoings[i]['invoice']);
        data.push(this.topoutgoings[i]['total_price']);
        colors.push(this.dynamicColor());
      }
      this.chart_data['topoutgoings'] = {
        labels: labels,
        datasets: [{
            label: 'Harga',
            data: data,
            backgroundColor: colors
        }]
      }
      this.chart_options['topoutgoings'] = { 
        maintainAspectRatio: false,
        onClick: this.redirectOutgoing
      } 
    },
    redirectProduct(_, array) {
      let idx = array[0]._index
      let product_id = this.topproducts[idx]['id'];
      this.$router.push({ name: 'detail-product', params: { product_id: product_id } });
    },
    redirectOutgoing(_, array) {
      let idx = array[0]._index
      let outgoing_id = this.topoutgoings[idx]['id'];
      this.$router.push({ name: 'detail-outgoing', params: { outgoing_id: outgoing_id } });
    },
  },
  created() {
    this.getFinanceData();
  }
}
</script>

<style>

</style>