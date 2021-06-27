<template>
  <div class="pa-3">
    <h1 class="text-center">Input Produk</h1>
    <v-container>
      <v-form 
        @submit.prevent="submitForm"
        ref="form"
        v-model="isFormValid"
      >
        <!-- Name -->
        <v-row class="mt-4">
          <v-col class="col-12">
            <v-text-field
              clearable
              label="Nama Barang"
              v-model="form.name"
              :rules="rules.name"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Stock -->
        <v-row class="mt-4">
          <v-col class="col-12">
            <v-text-field
              clearable
              label="Stok"
              type="number"
              v-model="form.stock"
              :rules="rules.stock"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Price -->
        <v-row class="mt-4">
          <v-col class="col-12">
            <v-text-field
              clearable
              label="Harga"
              type="number"
              v-model="form.price"
              :rules="rules.price"
              prefix="Rp"
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="d-flex justify-center mt-15">
          <v-btn color="blue white--text" class="justify-center" type="submit">
            Input Produk
          </v-btn>
        </div>
      </v-form>
      <v-snackbar
        v-model="snackbar"
      >
        {{snackbar_text}}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="yellow"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Tutup
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import axios  from 'axios';

export default {
  data() {
    return {
      isFormValid: false,
      form: {
        name: null,
        stock: null,
        price: null
      },
      rules: {
        name: [
          v => !!v || `Nama wajib diisi`
        ],
        stock: [
          v => !!v || `Stok wajib diisi`
        ],
        price: [
          v => !!v || `Harga wajib diisi`
        ]
      },
      snackbar: false,
      snackbar_text: ""
    };
  },
  methods: {
    submitForm() {
      if(this.isFormValid == false) {
        return;
      }

      axios.post("products/", this.form, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(res => {
          console.log(res)
          this.snackbar_text = "Input berhasil!"
          this.snackbar = true;
          this.$refs.form.reset();
        })
    }
  }
}
</script>

<style>

</style>