<template>
  <div class="pa-3">
    <h1 class="text-center">Input Barang Masuk</h1>
    <v-container>
      <v-form 
        @submit.prevent="submitForm"
        ref="form"
      >
        <!-- Datetime -->
        <v-row class="mt-4">
          <v-col class="col-12 col-md-6">
            <v-menu
              v-model="incoming_datepicker"
              :close-on-content-click="true"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.incoming_date"
                  label="Tanggal Masuk"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.incoming_date"
                @input="incoming_date = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col class="col-12 col-md-6">
            <v-menu
              ref="menu"
              v-model="incoming_timepicker"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value="form.incoming_time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.incoming_time"
                  label="Waktu Masuk"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="incoming_timepicker"
                v-model="form.incoming_time"
                full-width
                format="24hr"
                @click:minute="$refs.menu.save(form.incoming_time)"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>

        <!-- Payment Method & Status -->
        <v-row>
          <v-col class="col-12 col-md-6">
            <v-select
              v-model="form.payment_method"
              :items="payment_method_items"
              item-text="text"
              item-value="value"
              label="Metode Pembayaran"
              required
            >
            </v-select>
          </v-col>
          <v-col class="col-12 col-md-6">
            <v-select
              v-model="form.payment_status"
              :items="payment_status_items"
              item-text="text"
              item-value="value"
              label="Status Pembayaran"
              required
            >
            </v-select>
          </v-col>
        </v-row>

        <!-- Due Date & Supplier -->
        <v-row>  
          <v-col class="col-12 col-md-6">
            <v-menu
              v-model="duedate_datepicker"
              :close-on-content-click="true"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.duedate_date"
                  label="Tanggal Jatuh Tempo"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.duedate_date"
                @input="duedate_datepicker = false"
              ></v-date-picker>

            </v-menu>
          </v-col>
          <v-col class="col-12 col-md-6">
            <v-autocomplete
              v-model="form.supplier"
              :items="supplier_data"
              item-text="name"
              item-value="id"
              label="Supplier"
              :rules="[rules.required]"
            >
            </v-autocomplete>
          </v-col>
        </v-row>

        <!-- Products -->
        <v-row>
          <v-col class="col-12">
            <h2>Produk</h2>
          </v-col>
        </v-row>

        <v-btn @click="addProductsField">Tambah Produk</v-btn>

        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Nama</th>
                <th class="text-left">Banyak</th>                
                <th class="text-left">Harga Satuan</th>
                <th class="text-left">Harga Total</th>
                <th class="text-left">Hapus</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(product, index) in form.products"
                :key="index"
              >
                <td>
                  <v-autocomplete
                    v-model="form.products[index].id"
                    :items="products_data"
                    item-text="name"
                    item-value="id"
                    label="Produk"
                    :rules="[rules.required]"
                  >
                  </v-autocomplete>
                </td>
                <td>
                  <v-text-field
                    v-model="form.products[index].count"
                    hide-details
                    single-line
                    dense
                    type="number"
                    value="1"
                    :rules="[rules.required, rules.min_value]"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="form.products[index].price_per_count"
                    hide-details
                    single-line
                    dense
                    type="number"
                    value="1000"
                    :rules="[rules.required, rules.min_value]"
                  />
                </td>
                <td>
                  {{ form.products[index].count * form.products[index].price_per_count | currency_idr }}
                </td>
                <td>
                  <v-btn 
                    depressed 
                    @click="removeProductsField(index)" 
                    class="error">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <div class="d-flex justify-center mt-15">
          <v-btn color="blue white--text" class="justify-center" type="submit">
            Buat
          </v-btn>
        </div>
      </v-form>
      <v-snackbar
        v-model="snackbar"
      >
        {{snackbar_text}}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="pink"
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
import { axiosInstance } from '../main.js';

export default {
  data() {
    return {
      isFormValid: false,
      incoming_datepicker: false,
      incoming_timepicker: false,
      snackbar: false,
      snackbar_text: "",
      payment_method_items: [
        { text: "Cash", value: "cash" },
        { text: "Transfer", value: "transfer" },
        { text: "Giro", value: "giro" }
      ],
      payment_status_items: [
        { text: "Belum Dibayar", value: "not_started" },
        { text: "Cicilan", value: "installment" },
        { text: "Lunas", value: "finished" }
      ],
      duedate_datepicker: false,
      supplier_data: null,
      products_data: null,
      form: {
        incoming_date: new Date().toISOString().substr(0, 10),
        incoming_time: new Date().toLocaleTimeString('en-US', { hour12: false, 
                                              hour: "numeric", 
                                              minute: "numeric"}),
        payment_method: null,
        payment_status: null,
        duedate_date: new Date().toISOString().substr(0, 10),
        supplier: null,
        products: [],
      },
      rules: {
        required: value => !!value || 'Wajib diisi',
        min_value: v => v > 0 || 'Min. 1',
      }
    }
  },
  methods: {
    getSuppliersIncoming() {
      axiosInstance.get('entities/suppliers/igog')
        .then((response) => {
          this.supplier_data = response.data;
        })
    },
    getProducts() {
      axiosInstance.get('products/')
        .then((response) => {
          this.products_data = response.data;
        })
    },
    addProductsField() {
      this.form.products.push({
        id: null,
        count: 1,
        price_per_count: 1000
      });
    },
    removeProductsField(index) {
      this.form.products.splice(index, 1);
    },
    checkFormValid() {
      if (this.form.incoming_date === null || this.form.incoming_date === "") {
        return { valid: false, message: "Tanggal masuk harus diisi" };
      }
      if (this.form.incoming_time === null || this.form.incoming_time === "") {
        return { valid: false, message: "Waktu masuk harus diisi" };
      }
      if (this.form.payment_method === null) {
        return { valid: false, message: "Metode pembayaran harus diisi" };
      }
      if (this.form.payment_status === null) {
        return { valid: false, message: "Status pembayaran harus diisi" };
      }
      if (this.form.duedate_date === null || this.form.duedate_date === "") {
        return { valid: false, message: "Tanggal jatuh tempo harus diisi" };
      }
      if (this.form.supplier === null || this.form.supplier === "") {
        return { valid: false, message: "Supplier harus diisi" };
      }
      if (this.form.products.length === 0) {
        return { valid: false, message: "Harus ada min. 1 produk" };
      }
      if (this.form.products.length > 0) {
        for (var i = 0; i < this.form.products.length; i++) {
          if (this.form.products[i]['id'] === null || this.form.products[i]['id'] === "") {
            return { valid: false, message: "Nama Produk harus diisi" };
          }
          if (this.form.products[i]['stock'] < 1) {
            return { valid: false, message: "Banyak Produk harus lebih dari 0" };
          }
          if (this.form.products[i]['price'] < 1) {
            return { valid: false, message: "Harga Produk harus lebih dari 0" };
          }
        }
      }

      return { valid: true, message: "Valid" };
    },
    submitForm() {

      var isValidObj = this.checkFormValid();

      if(isValidObj['valid'] === false){
        this.snackbar_text = isValidObj['message'];
        this.snackbar = true;
        return;
      }

      axiosInstance.post("igog/incomings/", this.form, {
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
  },
  created() {
    this.getSuppliersIncoming();
    this.getProducts();
  }
}
</script>

<style>

</style>