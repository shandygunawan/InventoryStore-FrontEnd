<template>
  <div>
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
                    <td>Nomor Invoice</td>
                    <td>: {{ incoming.invoice }}</td>
                  </tr>
                  <tr>
                    <td>Waktu Masuk</td>
                    <td>: {{ new Date(incoming.datetime) }}</td>
                  </tr>
                  <tr>
                    <td>Total Harga</td>
                    <td>: {{ total_incoming_price | currency_idr }}</td>
                  </tr>
                  <tr>
                    <td>Metode Pembayaran</td>
                    <td>: {{ titleCase(incoming.payment_method) }}</td>
                  </tr>
                  <tr>
                    <td>Status Pembayaran</td>
                    <td>: {{ incoming.payment_status }}</td>
                  </tr>
                  <tr v-if="incoming.payment_method === 'giro'">
                    <td>Tanggal Jatuh Tempo</td>
                    <td>: {{ incoming.installment_duedate }}</td>
                  </tr>
                  <tr v-if="incoming.payment_method === 'giro'">
                    <td>Pembayaran Ke-</td>
                    <td>: {{ incoming.installment_paid }}/{{ incoming.installment_tenor }} </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Supplier Detail -->
      <v-col class="col-12 col-md-6">
        <v-card style="height:100%">
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

    <v-row>
      <!-- Note -->
      <v-col class="col-12 col-md-6">
        <v-card style="height: 100%;">
          <v-card-title>Catatan</v-card-title>
          <v-card-text>
            {{ incoming.note }}
          </v-card-text>
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
                    <td>: {{ incoming.delivery_note }}</td>
                  </tr>
                  <tr>
                    <td>Jenis Pengambilan</td>
                    <td>: {{ titleCase(incoming.retrieval_type) }}</td>
                  </tr>
                  <tr>
                    <td>Tanggal Pengambilan</td>
                    <td>: {{ incoming.retrieval_date }}</td>
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

    <v-row>
      <!-- Products -->
      <v-col class="col-12">
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
    </v-row>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      incoming: null,
      total_incoming_price: 0,
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
          console.log(response.data);
          this.incoming = response.data;
          // this.incoming['payment_method'] = this.titleCase(this.incoming['payment_method']);
          
          let installment_paid = this.incoming['installment_paid'];
          let installment_tenor = this.incoming['installment_tenor'];

          if (installment_paid === installment_tenor) {
            this.incoming['payment_status'] = "Lunas"
          } else if (installment_paid > 0 && installment_paid < installment_tenor) {
            this.incoming['payment_status'] = "Sedang Dicicil"
          } else if (installment_paid === 0) {
            this.incoming['payment_status'] = "Belum Dibayar"
          }

          
          for(var i = 0; i < this.incoming.products.length; i++) {
            var price_total_per_item = this.incoming.products[i].count * this.incoming.products[i].price_per_count;
            this.total_incoming_price = this.total_incoming_price + price_total_per_item;
          }
        })
    }
  },
  created() {
    this.getIncomingDetail();
  }
}
</script>