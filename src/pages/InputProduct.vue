<template>
  <div>
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
              label="Nama"
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

        <!-- Image File Input -->
        <v-file-input
          show-size
          accept="image/*"
          label="Gambar Produk"
          prepend-icon="mdi-image-outline"
          v-model="form.image"
          @change="previewImage"
        ></v-file-input>
        <v-img :src="url_image"></v-img>

        <!-- Submit Button -->
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
      url_image: null,
      form: {
        name: null,
        stock: null,
        price: null,
        image: null,
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
    previewImage() {
      this.url_image = URL.createObjectURL(this.form.image);
    },
    submitForm() {
      if(this.isFormValid == false) {
        return;
      }

      let form_data = new FormData();
      form_data.append('name', this.form.name);
      form_data.append('stock', this.form.stock);
      form_data.append('price', this.form.price);
      form_data.append('image', this.form.image);
      
      axios.post("products/", form_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
        .then(res => {
          console.log(res)
          this.snackbar_text = "Input berhasil!"
          this.snackbar = true;
          this.$refs.form.reset();
          this.url_image = null;
        })
    }
  }
}
</script>

<style>

</style>