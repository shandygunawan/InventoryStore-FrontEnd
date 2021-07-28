<template>
  <div>
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

            <v-spacer></v-spacer>

            <!-- Edit Dialog -->
            <v-dialog
              v-model="dialogs.edit"
              width="700"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  small
                  color="primary"
                  depressed
                  v-on="on"
                  v-bind="attrs"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <v-form
                @submit.prevent="updateProduct"
                ref="form"
                v-model="isFormValid"
              >
                <v-card>
                  <v-card-title>Ubah</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col class="col-12">
                        <v-text-field 
                          label="Nama" 
                          v-model="form.name"
                          :rules="rules.name"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="col-12">
                        <v-text-field 
                          label="Harga" 
                          v-model="form.price"
                          :rules="rules.price"
                          type="number"
                          prefix="Rp"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="col-12">
                        <v-text-field 
                          label="Stock" 
                          v-model="form.stock"
                          :rules="rules.stock"
                          type="number"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn 
                      color="primary" 
                      type="submit"
                      @click="dialogs.edit = false"
                    >Ubah</v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-dialog>

            <!-- Delete Dialog -->
            <v-dialog
              v-model="dialogs.delete"
              width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn 
                  class="ml-2"
                  fab
                  small
                  color="error"
                  depressed
                  v-on="on"
                  v-bind="attrs"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title>Hapus?</v-card-title>
                <v-card-actions>
                  <v-btn color="error" text @click="deleteProduct">Ya</v-btn>
                  <v-btn text @click="closeDialogDelete">Tidak</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            
            
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col class="col-3">Harga : </v-col>
              <v-col class="col-3">{{ product.product.price | currency_idr }} </v-col>
            </v-row>
            <v-row>
              <v-col class="col-3">Stok : </v-col>
              <v-col class="col-3">{{ product.product.stock | separator }} </v-col>
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
                <td>{{ history.price | currency_idr }}</td>
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
import axios from "axios";

export default {
  data() {
    return {
      product: null,
      dialogs: {
        edit: false,
        delete: false
      },
      isFormValid: false,
      form: {
        name: null,
        price: null,
        stock: null
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
    };
  },
  methods: {
    getProductDetail() {
      var url = 'products/' + this.$route.params.product_id
      axios.get(url)
        .then((response) => {
          this.product = response.data;
          this.form.name = this.product.product.name;
          this.form.price = this.product.product.price;
          this.form.stock = this.product.product.stock;
        })
    },
    updateProduct() {
      if (this.isFormValid === false) {
        return;
      }

      var url = 'products/' + this.$route.params.product_id + "/";
      axios.put(url, this.form)
        .then((response) => {
          if (response.data.success === true) {
            this.$router.go();
          }
        })
    },
    deleteProduct() {
      var url = 'products/' + this.$route.params.product_id + "/";
      axios.delete(url)
        .then(() => {
          this.$router.replace('/products');
        })
      this.dialogs.delete = false;
    },
    closeDialogDelete() {
      this.dialogs.delete = false;
    }
  },
  created() {
    this.getProductDetail();
  }
}
</script>

<style>

</style>