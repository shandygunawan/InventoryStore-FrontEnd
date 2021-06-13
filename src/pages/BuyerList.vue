<template>
  <div class="pa-3">
    <h2>List Pembeli</h2>
    <v-text-field class="mt-3" placeholder="Cari" v-model="search" prepend-icon="mdi-magnify"></v-text-field>
    <v-data-table
      :headers="headers"
      :items="buyers"
      :item-key="buyers.id"
      :items-per-page="10"
      :search="search"
      must-sort="true"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:item="props">
        <tr>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.phone_number }}</td>
          <td>{{ props.item.num_ktp }}</td>
          <td>{{ props.item.num_npwp }}</td>
        </tr>
     </template>
    </v-data-table>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      buyers: [],
      headers: [
        { text: "Nama", value: "name", sortable: true, filterable: true },
        { text: "Nomor Telepon", value: "phone_number", sortable: true, filterable: true },
        { text: "Nomor KTP", value: "num_ktp", sortable: true, filterable: true },
        { text: "Nomor NPWP", value: "num_npwp", sortable: true, filterable: true }
      ],
      search: ""
    }
  },
  methods: {
    getBuyers() {
      axios.get('http://localhost:8000/entities/buyers/')
        .then((response) => {
          this.buyers = response.data;
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