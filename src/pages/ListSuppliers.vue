<template>
  <div class="pa-3">
    <h2>List Suppliers</h2>
    <v-text-field class="mt-3" placeholder="Cari" v-model="search" prepend-icon="mdi-magnify"></v-text-field>
    <v-data-table
      :headers="headers"
      :items="suppliers"
      :item-key="suppliers.id"
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
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.address }}</td>
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
      suppliers: [],
      headers: [
        { text: "Nama", value: "name", sortable: true, filterable: true },
        { text: "Nomor Telepon", value: "phone_number", filterable: true },
        { text: "Email", value: "email", filterable: true },
        { text: "Alamat", value: "address", sortable: true, filterable: true }
      ],
      search: ""
    }
  },
  methods: {
    getSuppliers() {
      axios.get('entities/suppliers/')
        .then((response) => {
          this.suppliers = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  created() {
    this.getSuppliers();
  }
}
</script>

<style>

</style>