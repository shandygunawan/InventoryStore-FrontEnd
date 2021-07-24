<template>
  <div class="pa-3">
    <v-dialog
      v-model="dialogs.edit"
      max-width="500px"
      persistent
    >
      <v-card>
        <v-card-title>Edit Akun</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col class="col-6 col-md-4">
                <v-text-field 
                  label="Nama" 
                  v-model="form.name"
                ></v-text-field>
              </v-col>
              <v-col class="col-6 col-md-4">
                <v-select
                  v-model="form.role"
                  :items="role_items"
                  item-text="text"
                  item-value="value"
                  label="Role"
                ></v-select>
              </v-col>
              <v-col class="col-6 col-md-4">
                <v-text-field
                  label="Nomor Telepon"
                  type="tel"
                  v-model="form.phone_number"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="col-6 col-md-4">
                <v-text-field
                  label="Alamat"
                  v-model="form.address"
                ></v-text-field>
              </v-col>
              <v-col class="col-6 col-md-4">
                <v-text-field
                  label="Salary"
                  type="number"
                  v-model="form.salary"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text color="blue darken-1" @click="dialogs.edit = false">Batal</v-btn>
          <v-btn text color="blue darken-1" @click="updateAccount">Simpan</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
    <v-dialog
      v-model="dialogs.delete"
      max-width="500px"
      persistent
    >
      <v-card>
        <v-card-title>
          Apakah anda yakin ingin menghapus akun ini?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogs.delete = false">Batal</v-btn>
          <v-btn color="red" text @click="deleteAccountConfirm">OK</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
    <v-data-table
      :headers="table_accounts.headers"
      :items="accounts"
      :item-key="accounts.username"
      :items-per-page="5"
      must-sort="true"
      sort-by="name"
      class="elevation-1"
    >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Akun</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>

        <router-link
          to="/register"
        >
          <v-btn
            color="primary"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
          >
            Buat Akun Baru
          </v-btn>
        </router-link>
        
      </v-toolbar>
    </template>

    <template v-slot:item.salary="{ item }">
      {{ item.salary | currency_idr }}
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editAccount(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteAccount(item)"
      >
        mdi-delete
      </v-icon>
    </template>

    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      accounts: [],
      deleteIndex: null,
      dialogs: {
        edit: false,
        delete: false
      },
      form: {
        id: null,
        username: null,
        name: null,
        role: null,
        phone_number: null,
        address: null,
        salary: null
      },
      table_accounts: {
        headers: [
          { text: "Nama", value: "name", sortable: true, filterable: true },
          { text: "Username", value: "username", sortable: true, filterable: true },
          { text: "Role", value: "role", filterable: true },
          { text: "Nomor Telepon", value: "phone_number", filterable: true },
          { text: "Alamat", value: "address", filterable: true },
          { text: "Gaji", value: "salary", sortable: true },
          { text: 'Aksi', value: 'actions', sortable: false },
        ]
      },
      role_items: [
        { text: "admin", value: "admin" },
        { text: "input", value: "input" },
        { text: "look", value: "look" }
      ]
    }
  },
  methods: {
    getAccounts() {
      axios.get('auth/accounts/')
        .then((response) => {
          this.accounts = response.data.users;
        })
    },
    editAccount(account) {
      this.form = account;
      this.dialogs.edit = true;
    },
    updateAccount() {
      let url = "auth/accounts/" + this.form.id + "/";
      axios.put(url, this.form)
        .then((response) => {
          if (response.data.success === true) {
            this.$router.go();
          }
        })
    },
    deleteAccount(account) {
      this.deleteIndex = this.accounts.indexOf(account);
      this.dialogs.delete = true;
    },
    deleteAccountConfirm() {
      if (this.deleteIndex !== null) {
        let account = this.accounts[this.deleteIndex];
        let url = "auth/accounts/" + account.id + "/";
        axios.delete(url)
          .then((response) => {
            if (response.data.success === true) {
              console.log("deleteAccountConfirm");
              this.$router.go();
            }
          })
      }
    }
  },
  created() {
    this.getAccounts();
  }
}
</script>

<style>

</style>