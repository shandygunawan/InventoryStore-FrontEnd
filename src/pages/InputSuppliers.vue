<template>
  <div class="pa-3">
    <h1 class="text-center">Input Supplier</h1>
    <v-container>
      <v-form 
        @submit.prevent="submitForm"
        ref="form"
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
              label="Email"
              type="email"
              v-model="form.email"
              :rules="rules.email"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-4">
          <v-col class="col-12">
            <v-textarea
              clearable
              label="Alamat"
              v-model="form.address"
              :rules="rules.address"
            ></v-textarea>
          </v-col>
        </v-row>
        <div class="d-flex justify-center mt-15">
          <v-btn color="blue white--text" class="justify-center" type="submit">
            Buat Supplier
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: null,
        phone_number: null,
        email: null,
        address: null
      },
      rules: {
        name: [
          v => !!v || `Nama wajib diisi`
        ],
        phone_number: [
          v => !!v || `Nomor telepon wajib diisi`
        ],
        email: [
          v => !!v || `Email wajib diisi`,
          v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Pola Email harus benar'
        ],
        address: [
          v => !!v || `Alamat wajib diisi`
        ]
      }
    };
  },
  methods: {
    submitForm() {
      console.log(this.form);
    }
  }
}
</script>

<style>

</style>