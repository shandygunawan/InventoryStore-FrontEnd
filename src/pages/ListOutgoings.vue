<template>
  <div>
    <h2>List Barang Keluar</h2>
    <v-text-field class="mt-3" placeholder="Cari" v-model="search" prepend-icon="mdi-magnify"></v-text-field>
    <v-data-table
      :headers="headers"
      :items="outgoings"
      :item-key="outgoings.id"
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
            <td>{{ props.item.buyer_name }}</td>
            <td>{{ props.item.payment_method }}</td>
            <td>
              <router-link :to="{ name: 'detail-outgoing', params: { outgoing_id: props.item.id } }">
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
      outgoings: [],
      headers: [
        { text: "Nomor Invoice", value: "invoice", sortable: true, filterable: true },
        { text: "Nomor Surat Jalan", value: "delivery_note", sortable: true, filterable: true },
        { text: "Waktu Keluar", value: "datetime", sortable: true, filterable: true },
        { text: "Pembeli", value: "buyer_name", sortable: true, filterable: true },
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
    getBuyers() {
      axios.get('igog/outgoings/')
        .then((response) => {
          this.outgoings = response.data;
        })
    }
  },
  created() {
    this.getBuyers();
  }
}
</script>

<style>

</style>