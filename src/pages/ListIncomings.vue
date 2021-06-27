<template>
  <div class="pa-3">
    <h2>List Barang Masuk</h2>
    <v-text-field class="mt-3" placeholder="Cari" v-model="search" prepend-icon="mdi-magnify"></v-text-field>
    <v-data-table
      :headers="headers"
      :items="incomings"
      :item-key="incomings.id"
      :items-per-page="10"
      :search="search"
      must-sort="true"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:item="props">
          <tr>
            <td>{{ new Date(props.item.datetime).toLocaleString('id-ID', {
              dateStyle: "long",
              timeStyle: "short"
              }) }}
            </td>
            <td>{{ props.item.supplier_name }}</td>
            <td>{{ props.item.payment_method }}</td>
            <td>{{ props.item.payment_status }}</td>
            <td>{{ new Date(props.item.due_date).toLocaleString('id-iD', {
              dateStyle: "long"
              }) }}
            </td>
            <td>
              <router-link :to="{ name: 'detail-incoming', params: { incoming_id: props.item.id } }">
                <v-btn small text>Detail</v-btn>
              </router-link>
            </td>
          </tr>
     </template>
    </v-data-table>
  </div>
</template>

<script>
import { axiosInstance } from '../main.js';

export default {
  data() {
    return {
      incomings: [],
      headers: [
        { text: "Waktu Masuk", value: "datetime", sortable: true, filterable: true },
        { text: "Supplier", value: "supplier_name", sortable: true, filterable: true },
        { text: "Metode Pembayaran", value: "payment_method", sortable: true, filterable: true },
        { text: "Status Pembayaran", value: "payment_status", sortable: true, filterable: true },
        { text: "Tanggal Jatuh Tempo", value: "due_date", sortable: true, filterable: true }
      ],
      search: ""
    }
  },
  methods: {
    titleCase(str) {
      str = str.toLowerCase().split(' ');
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
      }
      return str.join(' ');
    },
    getSuppliers() {
      axiosInstance.get('igog/incomings/')
        .then((response) => {
          this.incomings = response.data;

          for(var i = 0; i < this.incomings.length; i++){
            this.incomings[i]['payment_method'] = this.titleCase(this.incomings[i]['payment_method']);

            var payment_status = this.incomings[i]['payment_status'];

            if (payment_status === "not_started") {
              this.incomings[i]['payment_status'] = "Belum Mulai Bayar"
            } else if (payment_status === "installment") {
              this.incomings[i]['payment_status'] = "Cicilan"
            } else if (payment_status === "finished") {
              this.incomings[i]['payment_status'] = "Lunas"
            }
          }

        })
    }
  },
  created() {
    this.getSuppliers();
  }
}
</script>

<style>

</style>