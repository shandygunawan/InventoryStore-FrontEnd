<template>
  <div class="pa-3">
    <h2>List Produk</h2>
    <v-text-field class="mt-3" placeholder="Cari" v-model="search" prepend-icon="mdi-magnify"></v-text-field>
    <v-data-table
      :headers="headers"
      :items="products"
      :item-key="products.id"
      :items-per-page="10"
      :search="search"
      must-sort="true"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:item="props">
        <tr>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.stock }}</td>
          <td>{{ props.item.price }}</td>
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
      products: [],
      headers: [
        { text: "Nama", value: "name", sortable: true, filterable: true },
        { text: "Stok", value: "stock", sortable: true },
        { text: "Harga", value: "price", sortable: true }
      ],
      search: ""
    }
  },
  methods: {
    getProducts() {
      axios.get('http://localhost:8000/products/')
        .then((response) => {
          this.products = response.data;
        })
    }
  },
  created() {
    this.getProducts();
  }
}
</script>

<style>

</style>