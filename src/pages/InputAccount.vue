<template>
  <div class="pa-3">
    <h1 class="text-center">Input Akun</h1>
    <v-container>
      <v-form
        @submit.prevent="submitForm"
        ref="form"
        v-model="isFormValid"
      >
        <v-row class="mt-4">
          <v-col class="col-12 col-md-6">
            <v-text-field
              label="Username"
              v-model="form.username"
              :rules="rules.required"
            ></v-text-field>
          </v-col>
          <v-col class="col-12 col-md-6">
            <v-text-field
              label="Password"
              v-model="form.password"
              type="password"
              :rules="rules.required"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12 col-md-6">
            <v-text-field
              label="Nama"
              v-model="form.name"
              :rules="rules.required"
            ></v-text-field>
          </v-col>
          <v-col class="col-12 col-md-6">
            <v-select
              v-model="form.role"
              :items="role_items"
              item-text="text"
              item-value="value"
              label="Role"
              :rules="rules.required"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12 col-md-6">
            <v-text-field
              label="Nomor Telepon"
              v-model="form.phone_number"
              type="tel"
              :rules="rules.required"
            ></v-text-field>
          </v-col>
          <v-col class="col-12 col-md-6">
            <v-text-field
              label="Gaji"
              v-model="form.salary"
              :rules="rules.required"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            <v-textarea
              label="Alamat"
              v-model="form.address"
              :rules="rules.required"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12 text-center">
            <v-btn
              color="primary"
              type="submit"
            >
              Buat Akun
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
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
        username: null,
        password: null,
        name: null,
        role: null,
        phone_number: null,
        address: null,
        salary: null
      },
      role_items: [
        { text: "Admin", value: "admin" },
        { text: "Input", value: "input" },
        { text: "Lihat", value: "look" },
      ],
      rules: {
        required: v => !!v || `wajib diisi`
      }
    }
  },
  methods: {
    submitForm() {
      if (this.isFormValid === false) {
        return;
      }

      axios.post("auth/register/", this.form, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => {
          console.log(response);
          if(response.data.success === true) {
            this.$router.push({ name: "admin-accounts" });
          }
        })
      
    }
  }
}
</script>

<style>

</style>