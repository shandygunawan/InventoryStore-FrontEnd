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
                    <td>: {{ new Date(incoming.datetime) }}</td>
                  </tr>
                  <tr>
                    <td>Metode Pembayaran</td>
                    <td>: {{ incoming.payment_method }}</td>
                  </tr>
                  <tr>
                    <td>Status Pembayaran</td>
                    <td>: {{ incoming.payment_status }}</td>
                  </tr>
                  <tr>
                    <td>Tanggal Jatuh Tempo</td>
                    <td>: {{ incoming.due_date }}</td>
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
          <v-card-title>Supplier</v-card-title>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>Nama</td>
                    <td>: {{ incoming.supplier.name }}</td>
                  </tr>
                  <tr>
                    <td>Nomor Telepon</td>
                    <td>: {{ incoming.supplier.phone_number }}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>: {{ incoming.supplier.email }}</td>
                  </tr>
                  <tr>
                    <td>Alamat</td>
                    <td>: {{ incoming.supplier.address }}</td>
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
            :items="incoming.products"
            :item-key="incoming.products.id"
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
      incoming: null,
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
    getIncomingDetail() {
      var url = 'igog/incomings/' + this.$route.params.incoming_id + "/"
      axios.get(url)
        .then((response) => {
          this.incoming = response.data;
          this.incoming['payment_method'] = this.titleCase(this.incoming['payment_method']);
          
          var payment_status = this.incoming['payment_status'];
          if (payment_status === "not_started") {
              this.incoming['payment_status'] = "Belum Mulai Bayar"
            } else if (payment_status === "installment") {
              this.incoming['payment_status'] = "Cicilan"
            } else if (payment_status === "finished") {
              this.incoming['payment_status'] = "Lunas"
            }
        })
    }
  },
  created() {
    this.getIncomingDetail();
  }
}
</script>

<style>

</style>