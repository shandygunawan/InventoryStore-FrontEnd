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
                    <td>: {{ titleCase(outgoing.payment_method) }}</td>
                  </tr>
                  <tr>
                    <td>Status Pembayaran</td>
                    <td>: {{ outgoing.payment_status }}</td>
                  </tr>
                  <tr v-if="outgoing.payment_method === 'giro'">
                    <td>Tanggal Jatuh Tempo</td>
                    <td>: {{ outgoing.installment_duedate }}</td>
                  </tr>
                  <tr v-if="outgoing.payment_method === 'giro'">
                    <td>Pembayaran Ke-</td>
                    <td>: {{ outgoing.installment_paid }}/{{ outgoing.installment_tenor }} </td>
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

      <!-- Delivery Note -->
      <v-col class="col-12 col-md-6">
        <v-card>
          <v-card-title>Surat Jalan</v-card-title>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>Nomor Surat Jalan</td>
                    <td>: {{ outgoing.delivery_note }}</td>
                  </tr>
                  <tr>
                    <td>Jenis Pengambilan</td>
                    <td>: {{ titleCase(outgoing.retrieval_type) }}</td>
                  </tr>
                  <tr>
                    <td>Tanggal Pengambilan</td>
                    <td>: {{ outgoing.retrieval_date }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary">
              <v-icon left>mdi-file-pdf-outline</v-icon>
              Cetak Surat Jalan
            </v-btn>
          </v-card-actions>
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
          
          let installment_paid = this.outgoing['installment_paid'];
          let installment_tenor = this.outgoing['installment_tenor'];

          if (installment_paid === installment_tenor) {
            this.outgoing['payment_status'] = "Lunas"
          } else if (installment_paid > 0 && installment_paid < installment_tenor) {
            this.outgoing['payment_status'] = "Sedang Dicicil"
          } else if (installment_paid === 0) {
            this.outgoing['payment_status'] = "Belum Dibayar"
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