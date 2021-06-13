<template>
  <div class="pa-3">
    <h1 class="text-center">Input Barang Masuk</h1>
    <v-container>
      <v-form v-model="isFormValid" method="post" @submit.prevent="submitForm">
        <!-- Datetime -->
        <v-row class="mt-4">
          <v-col class="col-12 col-md-6">
            <v-dialog
              ref="dialog"
              v-model="incoming_datepicker"
              :return-value.sync="date"
              persistent
              width="290px"
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
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="incoming_datepicker = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dialog.save(date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col class="col-12 col-md-6">
            <v-dialog
              ref="dialog"
              v-model="incoming_timepicker"
              :return-value.sync="time"
              persistent
              width="290px"
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
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="incoming_timepicker = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dialog.save(time)"
                >
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
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
            >
            </v-select>
          </v-col>
        </v-row>

        <!-- Due Date & Supplier -->
        <v-row>  
          <v-col class="col-12 col-md-6">
            <v-dialog
              ref="dialog"
              v-model="duedate_datepicker"
              :return-value.sync="date"
              persistent
              width="290px"
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
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="duedate_datepicker = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dialog.save(date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col class="col-12 col-md-6">
            <v-autocomplete
              v-model="form.supplier"
              :items="supplier_data"
              item-text="name"
              item-value="id"
              label="Supplier"
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
                <th class="text-left">Jumlah</th>                
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
                  >
                  </v-autocomplete>
                </td>
                <td>
                  <v-text-field
                    v-model="form.products[index].stock"
                    hide-details
                    single-line
                    dense
                    type="number"
                    value="1"
                  />
                </td>
                <td>
                  <v-text-field
                    v-model="form.products[index].price"
                    hide-details
                    single-line
                    dense
                    type="number"
                    value="1000"
                  />
                </td>
                <td>
                  {{ form.products[index].stock * form.products[index].price }}
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
            Submit
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "XCSRF-TOKEN";

export default {
  data() {
    return {
      isFormValid: false,
      incoming_datepicker: false,
      incoming_timepicker: false,
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
    }
  },
  methods: {
    getSuppliersIncoming() {
      axios.get('http://localhost:8000/entities/suppliers_incoming/')
        .then((response) => {
          this.supplier_data = response.data;
        })
    },
    getProducts() {
      axios.get('http://localhost:8000/products/')
        .then((response) => {
          this.products_data = response.data;
        })
    },
    addProductsField() {
      this.form.products.push({
        id: null,
        stock: 1,
        price: 1000
      });
    },
    removeProductsField(index) {
      this.form.products.splice(index, 1);
    },
    submitForm() {
      console.log(this.form);
      axios.post("http://localhost:8000/igog/incoming_create/", this.form, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          console.log(res);
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