<template>
  <div>
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
            <td>{{ props.item.invoice }}</td>
            <td>{{ props.item.delivery_note }}</td>
            <td>{{ new Date(props.item.datetime).toLocaleString('id-ID', {
              dateStyle: "long",
              timeStyle: "short"
              }) }}
            </td>
            <td>{{ props.item.supplier_name }}</td>
            <td>{{ props.item.payment_method }}</td>
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
import axios from 'axios';

export default {
  data() {
    return {
      incomings: [],
      headers: [
        { text: "Nomor Invoice", value: "invoice", sortable: true, filterable: true },
        { text: "Nomor Surat Jalan", value: "delivery_note", sortable: true, filterable: true },
        { text: "Waktu Masuk", value: "datetime", sortable: true, filterable: true },
        { text: "Supplier", value: "supplier_name", sortable: true, filterable: true },
        { text: "Metode Pembayaran", value: "payment_method", sortable: true, filterable: true },
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
      axios.get('igog/incomings/')
        .then((response) => {
          this.incomings = response.data;
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