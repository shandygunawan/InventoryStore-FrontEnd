<template>
  <div class="pa-3">
    <v-container>
      <!-- Database -->
      <v-row>
        <v-col class="col-12">
          <v-card>
            <v-card-title>Database</v-card-title>
            <v-card-text>
              <v-row>
                <v-col class="col-12 col-md-6">
                  <v-simple-table>
                    <thead>
                      <tr>
                        <th>Kategori</th>
                        <th>Banyak</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Barang Masuk</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>Barang Keluar</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>Supplier</td>
                        <td>3</td>
                      </tr>
                      <tr>
                        <td>Pembeli</td>
                        <td>4</td>
                      </tr>
                    </tbody>
                  </v-simple-table>
              </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Backup and Restore -->
      <v-row>
        <v-col class="col-12">
          <v-card>
            <v-toolbar
              color="cyan"
              dark
              flat
            >
              <v-toolbar-title>Backup And Restore</v-toolbar-title>

              <template v-slot:extension>
                <v-tabs
                  v-model="tabs.backuprestore_state"
                  align-with-title
                >
                  <v-tabs-slider color="yellow"></v-tabs-slider>

                  <v-tab
                    v-for="item in tabs.backuprestore_items"
                    :key="item"
                  >
                    {{ item }}
                  </v-tab>
                </v-tabs>
              </template>
            </v-toolbar>

            <v-tabs-items v-model="tabs.backuprestore_state">

              <!-- Sejarah -->
              <v-tab-item>
                <v-card>
                  <v-card-text>
                    <v-data-table
                      :headers="backup_history.headers"
                      :items="backup_history.data"
                      :item-key="backup_history.data.name"
                      :items-per-page="5"
                      must-sort="true"
                      sort-by="name"
                      class="elevation-1"
                    >
                      <template v-slot:item.datetime="{ item }">
                        {{ toLocaleDateTime(item.datetime) }}
                      </template>

                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <!-- Aksi -->
              <v-tab-item>
                <v-card>
                  <v-card-text>
                    <v-row>
                      <v-col class="col-12 col-sm-4 col-md-3">
                        <v-btn
                          color="cyan white--text"
                        >
                          Backup Sekarang
                        </v-btn>
                      </v-col>
                      <v-col class="col-12 col-sm-4 col-md-3">
                        <v-btn
                          color="green white--text"
                        >
                          Restore Otomatis
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <!-- Pengaturan -->
              <v-tab-item>
                <v-card>
                  <v-card-text>
                    <!-- Auto Backup Time -->
                    <v-row>
                      <v-col class="col-12 col-md-6">
                        <v-menu
                          ref="menu"
                          v-model="menu_backup_time"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="time"
                          transition="scale-transition"
                          offset-y
                          max-width="400px"
                          max-height="400px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form_backup.backup_time"
                              label="Waktu Backup Automatis"
                              prepend-icon="mdi-clock-time-four-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="menu_backup_time"
                            v-model="form_backup.backup_time"
                            full-width
                            @click:minute="$refs.menu.save(form_backup.backup_time)"
                          ></v-time-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary">
                      Simpan
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      menu_backup_time: null,
      backup_info: {},
      backup_history: {
        data: [],
        headers: [
          { text: "Nama Backup", value: "name", sortable: true },
          { text: "Waktu Backup", value: "datetime", sortable: true }
        ]
      },
      tabs: {
        backuprestore_state: null,
        backuprestore_items: [ "Sejarah", "Aksi", "Pengaturan" ],
      },
      form_backup: {
        backup_time: null,
      }
    };
  },
  methods: {
    toLocaleDateTime(datetime_str) {
      return new Date(datetime_str).toLocaleString('id-ID', {
        dateStyle: "long",
        timeStyle: "short"
      }) 
    },
    getBackupInfo() {
      axios.get("utils/backup/info")
        .then((response) => {
          this.backup_info = response.data.data;
          this.form_backup.backup_time = this.backup_info.time_autobackup;
        })
    },
    getBackupHistory() {
      axios.get("utils/backup/list")
        .then((response) => {
          console.log(response);
          this.backup_history.data = response.data.data;
        })
    }
  },
  created() {
    this.getBackupInfo();
    this.getBackupHistory();
  }
}
</script>

<style>

</style>