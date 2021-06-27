<template>
  <div class="pa-3">
    <h1 class="text-center">Input Pembeli</h1>
    <v-container>
      <v-form 
        @submit.prevent="submitForm"
        ref="form"
        v-model="isFormValid"
      >
        <v-row class="mt-4">
          <v-col class="col-12">
            <v-text-field
              clearable
              label="Nama Supplier"
              v-model="form.name"
              :rules="rules.name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-4">
          <v-col class="col-12">
            <v-text-field
              clearable
              label="Nomor Telepon"
              type="number"
              v-model="form.phone_number"
              :rules="rules.phone_number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-4">
          <v-col class="col-12">
            <v-text-field
              clearable
              label="Nomor KTP"
              type="number"
              v-model="form.num_ktp"
              :rules="rules.num_ktp"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-4">
          <v-col class="col-12">
            <v-text-field
              clearable
              label="Nomor NPWP"
              type="number"
              v-model="form.num_npwp"
              :rules="rules.num_npwp"
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="d-flex justify-center mt-15">
          <v-btn color="blue white--text" class="justify-center" type="submit">
            Buat Pembeli
          </v-btn>
        </div>
      </v-form>
      <v-snackbar
        v-model="snackbar"
      >
        {{snackbar_text}}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="green"
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
import axios from 'axios';

export default {
  data() {
    return {
      isFormValid: false,
      form: {
        name: null,
        phone_number: null,
        num_ktp: null,
        num_npwp: null
      },
      rules: {
        name: [
          v => !!v || `Nama wajib diisi`
        ],
        phone_number: [
          v => !!v || `Nomor telepon wajib diisi`
        ],
        num_npwp: [
          v => !!v || `Nomor NPWP wajib diisi`
        ],
        num_ktp: [
          v => !!v || `Nomor KTP wajib diisi`
        ],
      },
    };
  },
  methods: {
    submitForm() {
      if(this.isFormValid == false) {
        return;
      }
      
      axios.post("entities/buyers/", this.form, {
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