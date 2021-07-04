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
                  @input="getDataHighFrequencyOutgoing"
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
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
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
      }
    }
  },
  methods: {
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
    // Utils
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
    this.getDataLowStock();
    this.getDataHighFrequencyIncoming("1 Minggu", 100);
    this.getDataHighFrequencyOutgoing("1 Minggu", 100);
  }
}
</script>

<style>

</style>