<template>
  <div class="pa-3">
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
            <td>{{ new Date(props.item.datetime).toLocaleString('id-ID', {
              dateStyle: "long",
              timeStyle: "short"
              }) }}
            </td>
            <td>{{ props.item.buyer_name }}</td>
            <td>{{ props.item.payment_method }}</td>
            <td>{{ props.item.payment_status }}</td>
            <td>{{ new Date(props.item.due_date).toLocaleString('id-iD', {
              dateStyle: "long"
              }) }}
            </td>
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
        { text: "Waktu Masuk", value: "datetime", sortable: true, filterable: true },
        { text: "Pembeli", value: "buyer_name", sortable: true, filterable: true },
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
    getBuyers() {
      axios.get('igog/outgoings/')
        .then((response) => {
          this.outgoings = response.data;

          for(var i = 0; i < this.outgoings.length; i++){
            this.outgoings[i]['payment_method'] = this.titleCase(this.outgoings[i]['payment_method']);

            var payment_status = this.outgoings[i]['payment_status'];

            if (payment_status === "not_started") {
              this.outgoings[i]['payment_status'] = "Belum Mulai Bayar"
            } else if (payment_status === "installment") {
              this.outgoings[i]['payment_status'] = "Cicilan"
            } else if (payment_status === "finished") {
              this.outgoings[i]['payment_status'] = "Lunas"
            }
          }

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