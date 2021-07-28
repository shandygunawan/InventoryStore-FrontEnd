<template>
  <div>
    <v-form
      @submit.prevent="submitForm"
      ref="form"
      v-model="isFormValid"
    >
      <v-container>
        <v-row class="justify-center">
          <v-col class="col-12 col-md-6">
            <v-card
              elevation="2"
            >
              <v-card-title class="justify-center">Masuk</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="form.username"
                  :rules="[rules.required]"
                  label="Username"
                  name="username"
                ></v-text-field>

                <v-text-field
                  v-model="form.password"
                  :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off' "
                  :rules="[rules.required]"
                  :type="show_password ? 'text' : 'password'"
                  label="Password"
                  name="password"
                  @click:append="show_password = !show_password"
                ></v-text-field>
              </v-card-text>

              <div v-if="isLoading" class="d-flex justify-center pa-3">
                <v-progress-circular indeterminate></v-progress-circular>
              </div>
              <p class="text-center red--text" v-if="!!error">{{ error }}</p>

              <v-card-actions class="justify-center">
                <v-btn
                  color="blue white--text"
                  type="submit"
                >
                  Masuk
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFormValid: false,
      form: {
        username: "",
        password: "",
      },
      show_password: false,
      rules: {
        required: value => !!value || 'Wajib diisi',
        min: v => v.length >= 8 || 'Min. 8 karakter',
        usernameMatch: () => (`Username dan Password tidak cocok`),
      },
      isLoading: false,
      error: null
    };
  },
  methods: {
    async submitForm() {
      if(this.isFormValid == false) {
        return;
      }

      this.isLoading = true;

      try {
        await this.$store.dispatch('login', this.form);
      } catch (err) {
        this.error = err.message;
      }

      this.isLoading = false;

      this.$router.replace('/products');
    }
  }
}
</script>

<style>

</style>