<template>
  <div class="pa-3">
    <v-row>
      <v-col class="col-12 col-md-6">
        <v-card>
          <v-card-title>Barang yang Sering Masuk</v-card-title>
          <v-card-text>
            <v-row>
              <v-col class="col-6">
                <v-select 
                  v-model="highfrequency_incoming.delta_text"
                  @input="getDataHighFrequencyIncoming"
                  :items="highfrequency_incoming.selections_delta"
                  prepend-icon="mdi-calendar-clock"
                  dense
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  v-model="highfrequency_incoming.top"
                  :items="highfrequency_incoming.selections_top"
                  @input="getDataHighFrequencyIncoming"
                  prepend-icon="mdi-align-vertical-top"
                  dense
                ></v-select>
              </v-col>
            </v-row>
            <v-data-table
              :headers="highfrequency_incoming.headers"
              :items="highfrequency_incoming.data"
              :items-per-page="10"
              sort-by="count"
              sort-desc
              dense
            ></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12 col-md-6">
        <v-card>
          <v-card-title>Barang yang Sering Keluar</v-card-title>
          <v-card-text>
            <v-row>
              <v-col class="col-6">
                <v-select 
                  v-model="highfrequency_outgoing.delta_text"
                  @input="getDataHighFrequencyOutgoing"
                  :items="highfrequency_outgoing.selections_delta"
                  prepend-icon="mdi-calendar-clock"
                  dense
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  v-model="highfrequency_outgoing.top"
                  :items="highfrequency_outgoing.selections_top"
                  @input="getDataHighFrequencyOutgoing"
                  prepend-icon="mdi-align-vertical-top"
                  dense
                ></v-select>
              </v-col>
            </v-row>
            <v-data-table
              :headers="highfrequency_outgoing.headers"
              :items="highfrequency_outgoing.data"
              :items-per-page="10"
              sort-by="count"
              sort-desc
              dense
            ></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12">
        <v-card>
          <v-card-title>Penjualan Produk per Hari</v-card-title>
          <v-card-text>
            <v-row>
              <v-col class="col-6">
                <v-autocomplete
                  v-model="product_sold_perday.product_id"
                  :items="products"
                  item-text="name"
                  item-value="id"
                  label="Produk"
                  @input="getDataProductSoldperDay"
                ></v-autocomplete>
              </v-col>
              <v-col class="col-6">
                <v-select 
                  v-model="product_sold_perday.delta_text"
                  @input="getDataProductSoldperDay"
                  :items="product_sold_perday.selections_delta"
                  prepend-icon="mdi-calendar-clock"
                  dense
                ></v-select>
              </v-col>
            </v-row>
            <chart-line
              v-if="product_sold_perday.ready"
              :chartdata="product_sold_perday.chart_data"
              :options="product_sold_perday.chart_options"
            ></chart-line>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

import ChartLine from '../components/ChartLine.vue';

export default {
  components: { ChartLine },
  data() {
    return {
      products: [],
      low_stock: {
        ready: false,
        data: [],
        headers: [
          { text: "Nama", value:"name", sortable: true },
          { text: "Stok", value:"stock", sortable: true }
        ]
      },
      highfrequency_incoming: {
        ready: false,
        data: [],
        headers: [
          { text: "Nama", value: "name", sortable: true },
          { text: "Jumlah", value: "count", sortable: true }
        ],
        selections_delta: [ '1 Minggu', '1 Bulan', '1 Tahun' ],
        selections_top: [ 20, 50, 100],
        delta: 7,
        delta_text: "1 Minggu",
        top: 20,
      },
      highfrequency_outgoing: {
        ready: false,
        data: [],
        headers: [
          { text: "Nama", value: "name", sortable: true },
          { text: "Jumlah", value: "count", sortable: true }
        ],
        selections_delta: [ '1 Minggu', '1 Bulan', '1 Tahun' ],
        selections_top: [ 20, 50, 100],
        delta: 7,
        delta_text: "1 Minggu",
        top: 20,
      },
      product_sold_perday: {
        ready: false,
        data: [],
        delta: 7,
        delta_text: "1 Minggu",
        selections_delta: [ '1 Minggu', '1 Bulan', '1 Tahun' ],
        product_id: null,
        chart_data: [],
        chart_options: []
      }
    }
  },
  methods: {
    // Get Data
    getDataLowStock() {
      axios.get('stock/low_stock', {
        params: {
          "threshold": 10
        }
      })
        .then((response) => {
          if (response.data.success === true) {
            this.low_stock.data = response.data.data;
            this.low_stock.ready = true;
          }
        })
    },
    getDataHighFrequencyIncoming() {
      this.highfrequency_incoming.delta = this.deltaTextToInt(this.highfrequency_incoming.delta_text);

      axios.get('stock/highfrequency/incoming', {
        params: {
          delta: this.highfrequency_incoming.delta,
          top: this.highfrequency_incoming.top
        }
      })
        .then((response) => {
          if (response.data.success === true) {
            this.highfrequency_incoming.data = response.data.data;
            this.highfrequency_incoming.ready = true;
          }
        })
    },
    getDataHighFrequencyOutgoing() {
      this.highfrequency_outgoing.delta = this.deltaTextToInt(this.highfrequency_outgoing.delta_text);
      axios.get('stock/highfrequency/outgoing', {
        params: {
          delta: this.highfrequency_outgoing.delta,
          top: this.highfrequency_outgoing.top
        }
      })
        .then((response) => {
          if (response.data.success === true) {
            this.highfrequency_outgoing.data = response.data.data;
            this.highfrequency_outgoing.ready = true;
          }
        })
    },
    getProducts() {
      axios.get('products/')
        .then((response) => {
          this.products = response.data;
        })
    },
    getDataProductSoldperDay() {
      if (this.product_sold_perday.product_id === null) {
        return;
      }

      this.product_sold_perday.delta = this.deltaTextToInt(this.product_sold_perday.delta_text);

      axios.get('/stock/productSoldperDay', {
        params: {
          delta: this.product_sold_perday.delta,
          product_id: this.product_sold_perday.product_id
        }
      })
        .then((response) => {
          if (response.data.success === true) {
            this.product_sold_perday.data = response.data.data;
            
            this.processProductSoldperDay();

            this.product_sold_perday.ready = true;
          }
        })
    },
    // Process
    processProductSoldperDay() {
      let labels = []
      let data = []
      for (const product_sold of this.product_sold_perday.data) {
        labels.push(product_sold['date']);
        data.push(product_sold['count']);
      }

      for (let i = 0; i < this.product_sold_perday.delta; i++) {
        let date_label = moment(labels[i], "YYYY-MM-DD");
        let date_ago = moment().subtract(this.product_sold_perday.delta-i, 'days').startOf("day")
        
        if (date_ago.isSame(date_label) === false) {
          labels.splice(i, 0, date_ago.format("YYYY-MM-DD"));
          data.splice(i, 0, 0);
        }
      }
      this.product_sold_perday.chart_data = {
        labels: labels,
        datasets: [{
          label: "Jumlah",
          data: data,
          fill: false,
          borderColor: this.dynamicColor(),
        }]
      }
      this.product_sold_perday.chart_options = {
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0
          }
        }
      }
    },
    // Utils
    dynamicColor() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    },
    deltaTextToInt(txt) {
      if (txt === "1 Minggu") {
        return 7
      } else if (txt === "1 Bulan") {
        return 30
      } else if (txt === "1 Tahun") {
        return 365
      }
    }
  },
  created() {
    // Complementary Data
    this.getProducts();

    // Main Data
    this.getDataLowStock();
    this.getDataHighFrequencyIncoming("1 Minggu", 100);
    this.getDataHighFrequencyOutgoing("1 Minggu", 100);
    
  },
  mounted() {
    this.getDataProductSoldperDay();
  }
}
</script>

<style>

</style>