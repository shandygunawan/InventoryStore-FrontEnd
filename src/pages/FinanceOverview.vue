<template>
  <div class="pa-3">

    <v-row>
      <v-col class="col-3">
        <v-card elevation="4">
          <v-card-title>Perhitungan Akun</v-card-title>
          <v-card-text>
            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Akun</th>
                    <th class="text-left">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Hutang</td>
                    <td class="red--text">{{ 100000 | currency_idr }}</td>
                  </tr>
                  <tr>
                    <td>Piutang</td>
                    <td class="green--text">{{ 100000 | currency_idr }}</td>
                  </tr>
                  <tr>
                    <td><b>Total</b></td>
                    <td><b>{{ 100000 | currency_idr }}</b></td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>


    <v-row>
      <v-col class="col-12 col-md-6">
        <v-card elevation="4">
          <v-card-title>Harga Barang Masuk 1 Minggu Terakhir</v-card-title>
          <v-card-text>
            Grafik Garis
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12 col-md-6">
        <v-card elevation="4">
          <v-card-title>Harga Barang Keluar 1 Minggu Terakhir</v-card-title>
          <v-card-text>
            Grafik Garis
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="col-12 col-md-6">
        <v-card elevation="4">
          <v-card-title>Top 10 Produk</v-card-title>
          <v-card-text>
            Grafik Batang
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12 col-md-6">
        <v-card elevation="4">
          <v-card-title>Top 10 Transaksi</v-card-title>
          <v-card-text>
            Grafik Batang
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="col-12 col-md-6">
        <v-card elevation="4">
          <v-card-title>Top 10 Supplier</v-card-title>
          <v-card-text>
            Grafik Batang
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12 col-md-6">
        <v-card elevation="4">
          <v-card-title>Top 10 Pembeli</v-card-title>
          <v-card-text>
            Grafik Batang
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>



  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>