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

      <v-row>
        <v-col class="col-12">
          <v-card>
            <v-toolbar
              color="cyan"
              dark
              flat
            >
              <v-toolbar-title>Backup</v-toolbar-title>

              <template v-slot:extension>
                <v-tabs
                  v-model="tabs.backup_state"
                  align-with-title
                >
                  <v-tabs-slider color="yellow"></v-tabs-slider>

                  <v-tab
                    v-for="item in tabs.backup_items"
                    :key="item"
                  >
                    {{ item }}
                  </v-tab>
                </v-tabs>
              </template>
            </v-toolbar>

            <v-tabs-items v-model="tabs.backup_state">

              <!-- Lokasi -->
              <v-tab-item>
                <v-simple-table>
                  <thead>
                    <tr>
                      <th>Lokasi Backup</th>
                      <th>Waktu Backup Terakhir</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Server</td>
                      <td>
                        {{ toLocaleDateTime(backup_info.time_createdbackup_latest_server) }}
                      </td>
                    </tr>
                    <tr>
                      <td>Dropbox</td>
                      <td>21 September 2021</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-tab-item>

              <!-- Sejarah -->
              <v-tab-item>
                <v-card>
                  <v-card-text>
                    Test
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <!-- Aksi -->
              <v-tab-item>
                <v-card>
                  <v-card-text>
                    <v-row>
                      <v-col class="col-12 col-sm-6 col-md-4">
                        <v-btn
                          color="cyan white--text"
                        >Backup Sekarang</v-btn>
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

                    <v-row>
                      <v-col class="col-6">
                        <span>Tujuan Backup</span>
                        <v-checkbox
                          v-model="form_backup.backup_target"
                          label="Server"
                          value="server"
                          hide-details
                        ></v-checkbox>
                        <v-checkbox
                          v-model="form_backup.backup_target"
                          label="Dropbox"
                          value="dropbox"
                          hide-details
                        ></v-checkbox>
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

      <!-- Restore -->
      <v-row>
        <v-col class="col-12">
          <v-card>
            <v-toolbar
              flat
              color="green"
              dark
            >
              <v-toolbar-title>Restore</v-toolbar-title>

              <template v-slot:extension>
                <v-tabs
                  v-model="tabs.restore_state"
                  align-with-title
                >
                  <v-tabs-slider color="red"></v-tabs-slider>

                  <v-tab
                    v-for="item in tabs.restore_items"
                    :key="item"
                  >
                    {{ item }}
                  </v-tab>
                </v-tabs>
              </template>
            </v-toolbar>

            <v-tabs-items v-model="tabs.restore_state">
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-btn color="green white--text">Restore</v-btn>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-file-input
                      show-size
                      truncate-length="100"
                      label="Upload Dump DB"
                    ></v-file-input>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="green">Restore</v-btn>
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
      tabs: {
        backup_state: null,
        backup_items: [ "Lokasi", "Sejarah", "Aksi", "Pengaturan" ],
        restore_state: null,
        restore_items: [ "Automatis", "Manual" ],
      },
      form_backup: {
        backup_time: null,
        backup_target: [],
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
          this.form_backup.backup_target = this.backup_info.location_backup;
        })
    }
  },
  created() {
    this.getBackupInfo();
  }
}
</script>

<style>

</style>