<template>
  <div class="pa-3">
    <v-row>
      <v-col class="col-12 col-md-5">
        <v-img 
          :src="product.product.image"
          :alt="product.product.name"
          max-height="600"
          max-width="600"
        />
      </v-col>
      <v-col class="col-12 col-md-6">
        <v-card
          elevation="2"
        >
          <v-card-title>
            {{ product.product.name }}
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col class="col-3">Harga : </v-col>
              <v-col class="col-3">{{ product.product.price }} </v-col>
            </v-row>
            <v-row>
              <v-col class="col-3">Stok : </v-col>
              <v-col class="col-3">{{ product.product.stock }} </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th>Harga</th>
                <th>Waktu Perubahan</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="history in product.histories"
                :key="history.price"
              >
                <td>{{ history.price }}</td>
                <td>{{ new Date(history.date_created) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      product: null
    };
  },
  methods: {
    getProductDetail() {
      var url = 'http://localhost:8000/products/' + this.$route.params.product_id
      axios.get(url)
        .then((response) => {
          this.product = response.data;
        })
    }
  },
  created() {
    this.getProductDetail();
  }
}
</script>

<style>

</style>