<template>
  <div class="pa-3">
    <h1 class="text-center">Input Barang Keluar</h1>
    <v-container>
      <v-form 
        @submit.prevent="submitForm"
        ref="form"
      >
        <!-- Invoice & Delivery Note -->
        <v-row class="mt-4">
          <v-col class="col-12">
            <v-card>
              <v-card-title>Invoice dan Surat Jalan</v-card-title>
              <v-card-text>
                <v-text-field
                  clearable
                  label="Nomor Invoice"
                  v-model="form.invoice"
                  :rules="rules.required"
                ></v-text-field>
                <v-text-field
                  clearable
                  label="Nomor Surat Jalan"
                  v-model="form.delivery_note"
                  :rules="rules.required"
                ></v-text-field>
                <v-autocomplete
                  v-model="form.buyer"
                  :items="buyer_data"
                  item-text="name"
                  item-value="id"
                  label="Pembeli"
                  :rules="[rules.required]"
                ></v-autocomplete>
                <v-select
                  v-model="form.retrieval_type"
                  :items="retrieval_type_items"
                  item-text="text"
                  item-value="value"
                  label="Metode Pengiriman"
                  required
                ></v-select>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Datetime -->
        <v-row>
          <v-col class="col-12">
            <v-card>
              <v-card-title>Waktu Masuk</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col class="col-12 col-md-6">
                    <v-menu
                      v-model="outgoing_datepicker"
                      :close-on-content-click="true"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.outgoing_date"
                          label="Tanggal Keluar"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="form.outgoing_date"
                        @input="outgoing_date = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col class="col-12 col-md-6">
                    <v-menu
                      ref="menu"
                      v-model="outgoing_timepicker"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value="form.outgoing_time"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.outgoing_time"
                          label="Waktu Keluar"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="outgoing_timepicker"
                        v-model="form.outgoing_time"
                        full-width
                        format="24hr"
                        @click:minute="$refs.menu.save(form.outgoing_time)"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>  
          </v-col>
        </v-row>

        <!-- Payment -->
        <v-row>
          <v-col class="col-12">
            <v-card>
              <v-card-title>Pembayaran</v-card-title>
              <v-card-text>

                <v-row>
                  <!-- Payment Method -->
                  <v-col class="col-12 col-md-6">
                    <v-select
                      v-model="form.payment_method"
                      :items="payment_method_items"
                      item-text="text"
                      item-value="value"
                      label="Metode Pembayaran"
                      required
                    ></v-select>
                  </v-col>
                  <!-- Installment Paid -->
                  <v-col class="col-12 col-md-6">
                    <v-select
                      v-model="form.installment_paid"
                      v-if="form.payment_method === 'cash' || form.payment_method === 'transfer'"
                      :items="installment_paid_items"
                      item-text="text"
                      item-value="value"
                      label="Status Pembayaran"
                      required
                    ></v-select>
                  </v-col>
                </v-row>

                <!-- Only Show if user selected "Giro" as payment method -->
                <v-row v-if="form.payment_method === 'giro'">  
                  <!-- Due Date -->
                  <v-col class="col-12 col-md-6">
                    <v-menu
                      v-model="installment_duedate"
                      :close-on-content-click="true"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.installment_duedate"
                          label="Tanggal Jatuh Tempo"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="form.installment_duedate"
                        @input="duedate_datepicker = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>

                  <!-- Installment fee -->
                  <v-col class="col-12 col-md-6">
                    <v-text-field
                      label="Tenor (Bulan)"
                      type="number"
                      v-model="form.installment_tenor"
                      :rules="rules.installment_tenor"
                    ></v-text-field>
                  </v-col>
                </v-row>

              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="col-12">
            <v-textarea
              clearable
              label="Catatan"
              v-model="form.note"
            ></v-textarea>
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
import axios from 'axios';

export default {
  data() {
    return {
      isFormValid: false,
      outgoing_datepicker: false,
      outgoing_timepicker: false,
      snackbar: false,
      snackbar_text: "",
      retrieval_type_items: [
        { text: "Diantar", value: "delivery"},
        { text: "Diambil oleh pembeli ", value: "pickup"}
      ],
      payment_method_items: [
        { text: "Cash", value: "cash" },
        { text: "Transfer", value: "transfer" },
        { text: "Giro", value: "giro" }
      ],
      installment_paid_items: [
        { text: "Belum Dibayar", value: 0 },
        { text: "Lunas", value: 1 }
      ],
      duedate_datepicker: false,
      buyer_data: null,
      products_data: null,
      form: {
        invoice: null,
        delivery_note: null,
        retrieval_type: null,
        outgoing_date: new Date().toISOString().substr(0, 10),
        outgoing_time: new Date().toLocaleTimeString('en-US', { hour12: false, 
                                              hour: "numeric", 
                                              minute: "numeric"}),
        payment_method: null,
        installment_paid: null,
        installment_duedate: new Date().toISOString().substr(0, 10),
        installment_tenor: null,
        note: "",
        buyer: null,
        products: [],
      },
      rules: {
        required: value => !!value || 'Wajib diisi',
        min_value: v => v > 0 || 'Min. 1',
      }
    }
  },
  methods: {
    getBuyersIncoming() {
      axios.get('entities/buyers/igog')
        .then((response) => {
          this.buyer_data = response.data;
        })
    },
    getProducts() {
      axios.get('products/')
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
      // Check if field is filled
      if (this.form.incoming_date === null || this.form.incoming_date === "") {
        return { valid: false, message: "Tanggal masuk harus diisi" };
      }
      if (this.form.incoming_time === null || this.form.incoming_time === "") {
        return { valid: false, message: "Waktu masuk harus diisi" };
      }
      if (this.form.payment_method === null) {
        return { valid: false, message: "Metode pembayaran harus diisi" };
      }
      if ( (this.form.payment_method === "cash" || this.form.payment_method === "transfer" ) && 
          this.form.installment_month === null) {
        return { valid: false, message: "Status pembayaran harus diisi" };
      }
      if (this.form.payment_method === "giro" && 
          (this.form.installment_duedate === null || this.form.installment_duedate === "") ) {
        return { valid: false, message: "Tanggal jatuh tempo harus diisi" };
      }
      if (this.form.payment_method === "giro" && 
          (this.form.installment_tenor === null || this.form.installment_tenor === "") ) {
        return { valid: false, message: "Tenor harus diisi" };
      }
      if (this.form.buyer === null || this.form.buyer === "") {
        return { valid: false, message: "Pembeli harus diisi" };
      }
      if (this.form.products.length === 0) {
        return { valid: false, message: "Harus ada min. 1 produk" };
      }
      if (this.form.products.length > 0) {
        // Check if product names are empty
        for (var i = 0; i < this.form.products.length; i++) {
          if (this.form.products[i]['id'] === null || this.form.products[i]['id'] === "") {
            return { valid: false, message: "Nama Produk harus diisi" };
          }
          if (this.form.products[i]['count'] < 1) {
            return { valid: false, message: "Banyak Produk harus lebih dari 0" };
          }

          let product_selected = this.products_data.find(o => o.id === parseInt(this.form.products[i]['id']));
          
          if (this.form.products[i]['count'] > product_selected['stock'] ) {
            return { 
              valid: false,
              message: "Banyak " + product_selected['name'] + " yang keluar lebih banyak dari stok yang ada" 
            };
          }

          if (this.form.products[i]['price_per_count'] < 1) {
            return { valid: false, message: "Harga Produk harus lebih dari 0" };
          }
        }

      }

      return { valid: true, message: "Valid" };
    },
    submitForm() {

      var isValidObj = this.checkFormValid();

      if (isValidObj['valid'] === false) {
        this.snackbar_text = isValidObj['message'];
        this.snackbar = true;
        return;
      }

      if (this.form.payment_method === "cash" || this.form.payment_method === "transfer") {
        this.form.installment_tenor = 1;
      }
      if (this.form.payment_method === "giro") {
        this.form.installment_paid = 0;
      }

      axios.post("igog/outgoings/", this.form, {
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
    this.getBuyersIncoming();
    this.getProducts();
  }
}
</script>

<style>

</style>