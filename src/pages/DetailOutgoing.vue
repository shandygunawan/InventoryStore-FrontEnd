<template>
  <div class="pa-3">
    <v-row>
      <!-- Incoming Detail -->
      <v-col class="col-12 col-md-6">
        <v-card>
          <v-card-title>Detail</v-card-title>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>Waktu Masuk</td>
                    <td>: {{ new Date(outgoing.datetime) }}</td>
                  </tr>
                  <tr>
                    <td>Metode Pembayaran</td>
                    <td>: {{ outgoing.payment_method }}</td>
                  </tr>
                  <tr>
                    <td>Status Pembayaran</td>
                    <td>: {{ outgoing.payment_status }}</td>
                  </tr>
                  <tr>
                    <td>Tanggal Jatuh Tempo</td>
                    <td>: {{ outgoing.due_date }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Supplier Detail -->
      <v-col class="col-12 col-md-6">
        <v-card>
          <v-card-title>Pembeli</v-card-title>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>Nama</td>
                    <td>: {{ outgoing.buyer.name }}</td>
                  </tr>
                  <tr>
                    <td>Nomor Telepon</td>
                    <td>: {{ outgoing.buyer.phone_number }}</td>
                  </tr>
                  <tr>
                    <td>Nomor KTP</td>
                    <td>: {{ outgoing.buyer.num_ktp }}</td>
                  </tr>
                  <tr>
                    <td>Nomor NPWP</td>
                    <td>: {{ outgoing.buyer.num_npwp }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Products -->
    <v-row>
      <v-col class="col-12 col-md-6">
        <v-card>
          <v-card-title>Produk</v-card-title>
          <v-data-table
            :headers="table_headers"
            :items="outgoing.products"
            :item-key="outgoing.products.id"
            :item-per-page="10"
            :search="table_search"
            must-sort="true"
            sort-by="name"
            class="elevation-1"
          >
            <template v-slot:item="props">
              <tr>
                <td>{{ props.item.product }}</td>
                <td>{{ props.item.count | separator }}</td>
                <td>{{ props.item.price_per_count | currency_idr }}</td>
                <td>{{ props.item.count * props.item.price_per_count | currency_idr }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <!-- Actions -->
      <v-col class="col-12 col-md-6">
        <v-card>
          <v-card-title>Aksi</v-card-title>
          <v-card-text>
            <v-btn color="primary">
              <v-icon left>mdi-file-pdf-outline</v-icon>
              Cetak Surat Jalan
            </v-btn>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      outgoing: null,
      vscroll_bench: 0,
      table_headers: [
        { text: "Nama", value: "name", sortable: true, filterable: true },
        { text: "Banyak", value: "count", sortable: true },
        { text: "Harga Satuan", value: "price_per_count", sortable: true },
        { text: "Harga Total" }
      ],
      table_search: ""
    };
  },
  methods: {
    titleCase(str) {
      str = str.toLowerCase().split(' ');
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
      }
      return str.join(' ');
    },
    getOutgoingDetail() {
      var url = 'igog/outgoings/' + this.$route.params.outgoing_id + "/"
      axios.get(url)
        .then((response) => {
          this.outgoing = response.data;
          this.outgoing['payment_method'] = this.titleCase(this.outgoing['payment_method']);
          
          var payment_status = this.outgoing['payment_status'];
          if (payment_status === "not_started") {
              this.outgoing['payment_status'] = "Belum Mulai Bayar"
            } else if (payment_status === "installment") {
              this.outgoing['payment_status'] = "Cicilan"
            } else if (payment_status === "finished") {
              this.outgoing['payment_status'] = "Lunas"
            }
        })
    }
  },
  created() {
    this.getOutgoingDetail();
  }
}
</script>

<style>

</style>