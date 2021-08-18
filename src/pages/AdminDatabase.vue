<template>
  <div>
    <!-- Database -->
    <v-row>
      <v-col class="col-12">
        <v-card>
          <v-toolbar
            color="blue"
            dark
            flat
          >
            <v-toolbar-title>Database</v-toolbar-title>
          </v-toolbar>

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
                      <td>{{ db_info.count.incoming }} ({{ formatBytes(db_info.size.incoming, 2) }})</td>
                    </tr>
                    <tr>
                      <td>Barang Keluar</td>
                      <td>{{ db_info.count.outgoing }} ({{ formatBytes(db_info.size.outgoing, 2) }})</td>
                    </tr>
                    <tr>
                      <td>Supplier</td>
                      <td>{{ db_info.count.supplier }} ({{ formatBytes(db_info.size.supplier, 2) }})</td>
                    </tr>
                    <tr>
                      <td>Pembeli</td>
                      <td>{{ db_info.count.buyer }} ({{ formatBytes(db_info.size.buyer, 2) }})</td>
                    </tr>
                    <tr>
                      <td>Produk</td>
                      <td>{{ db_info.count.product }} ({{ formatBytes(db_info.size.product, 2) }})</td>
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
                  >
                    <template v-slot:item.datetime="{ item }">
                      {{ toLocaleDateTime(item.datetime) }}
                    </template>

                    <template v-slot:item.actions="{ item }">

                      <v-icon @click="restoreBackupFromLocal(item)">
                        mdi-database-refresh
                      </v-icon>
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
                    <v-col class="col-12">
                      <h2>Backup</h2>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="col-12">
                      <v-btn
                        color="cyan white--text"
                        @click="createBackup"
                      >
                        Backup Sekarang
                      </v-btn>
                      <v-dialog
                        v-model="dialogs.backup"
                        hide-overlay
                        persistent
                        width="300"
                      >
                        <v-card color="primary" dark>
                          <v-card-text>
                            Proses Backup sedang berjalan...
                            <v-progress-linear
                              indeterminate
                              color="white"
                              class="mb-0"
                            >
                            </v-progress-linear>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="col-12"></v-col>
                  </v-row>
                  <v-row>
                    <v-col class="col-12">
                      <h2>Restore</h2>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="grow">
                      <v-file-input
                        truncate-length="50"
                        show-size
                        label="Upload File Backup"
                        v-model="restore_file"
                      ></v-file-input>
                    </v-col>
                    <v-col class="shrink d-flex align-center">
                      <v-btn
                        color="cyan"
                        text
                        @click="restoreBackupFromUpload"
                      >Restore</v-btn>
                    </v-col>
                    <v-dialog
                      v-model="dialogs.restore"
                      hide-overlay
                      persistent
                      width="300"
                    >
                      <v-card color="primary" dark>
                        <v-card-text>
                          Proses Restore sedang berjalan...
                          <v-progress-linear
                            indeterminate
                            color="white"
                            class="mb-0"
                          >
                          </v-progress-linear>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!-- Pengaturan -->
            <v-tab-item>
              <v-form @submit.prevent="submitBackupConfig">
                <v-card>
                  <v-card-text>
                    <v-row>
                      <!-- Auto Backup Location -->
                      <v-col class="col-12 col-md-6">
                        <v-text-field
                          label="Lokasi Backup"
                          v-model="form_backup.autobackup_location"
                          prepend-icon="mdi-folder"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>

                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                      color="primary"
                      type="submit"
                    >
                      Simpan
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      menu_backup_time: false,
      dialogs: {
        backup: false,
        restore: false,
      },
      db_info: {},
      backup_info: {},
      backup_history: {
        data: [],
        headers: [
          { text: "Nama Backup", value: "name", sortable: true },
          { text: "Waktu Backup", value: "datetime", sortable: true },
          { text: "Aksi", value: "actions", sortable: false }
        ]
      },
      tabs: {
        backuprestore_state: null,
        backuprestore_items: [ "Sejarah", "Aksi", "Pengaturan" ],
      },
      form_backup: {
        autobackup_location: null,
      },
      restore_file: null,
    };
  },
  methods: {
    toLocaleDateTime(datetime_str) {
      return new Date(datetime_str).toLocaleString('id-ID', {
        dateStyle: "long",
        timeStyle: "short"
      }) 
    },
    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },
    getDbInfo() {
      axios.get("utils/db/info/")
        .then((response) => {
          this.db_info = response.data.data;
        })
    },
    getBackupInfo() {
      axios.get("utils/backup/info/")
        .then((response) => {
          this.backup_info = response.data.data;
          this.form_backup.autobackup_location = this.backup_info.autobackup_location;
        })
    },
    getBackupHistory() {
      axios.get("utils/backup/list")
        .then((response) => {
          this.backup_history.data = response.data.data;
        })
    },
    createBackup() {
      this.dialogs.backup = true;
      axios.post("utils/backup/create/", this.form_backup)
        .then((response) => {
          if (response.data.success === true) {
            this.dialogs.backup = false;
            this.$emit("trigger-alert", "success", "Backup berhasil!");
          }
        })
    },
    restoreBackupFromLocal(backup_file) {
      this.dialogs.restore = true;

      axios.post("utils/backup/restore/local/", { "backup_filename": backup_file.name })
        .then((response) => {
          if (response.data.success === true) {
            this.dialogs.restore = false;
            this.$emit("trigger-alert", "success", "Restore berhasil!");
          } else {
            this.dialogs.restore = false;
            this.$emit("trigger-alert", "error", "Restore Gagal!");
          }
        })
        .catch(() => {
          this.dialogs.restore = false;
        })
    },
    restoreBackupFromUpload() {
      this.dialogs.restore = true;
      let form_data = new FormData();

      // files
      form_data.append("file", this.restore_file);

      axios.post("utils/backup/restore/upload/", form_data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then((response) => { 
          if (response.data.success === true) {
            this.dialogs.restore = false;
            this.$emit("trigger-alert", "success", "Restore berhasil!");
          } else {
            this.dialogs.restore = false;
            this.$emit("trigger-alert", "error", "Restore Gagal!");  
          }
        })
        .catch(() => {
          this.dialogs.restore = false;
          this.$emit("trigger-alert", "error", "Restore Gagal!");
        })
    },
    submitBackupConfig() {
      axios.post("utils/config/", this.form_backup)
        .then((response) => {
          let changed_configs = response.data.data;
          if (changed_configs.includes("autobackup_time") 
              && changed_configs.includes("autobackup_location")) {
            this.$emit('trigger-alert', "success", "Pengaturan Backup berhasil disimpan!");
            this.backup_info.autobackup_time = this.form_backup.autobackup_time;
            this.backup_info.autobackup_location = this.form_backup.autobackup_location;

          } else {
            this.$emit('trigger-alert', "error", "Pengaturan Backup gagal disimpan!");
          }
        })
    }
  },
  created() {
    this.getBackupInfo();
    this.getBackupHistory();
    this.getDbInfo();
  }
}
</script>

<style>

</style>