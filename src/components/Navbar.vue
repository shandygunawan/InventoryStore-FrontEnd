<template>
    <v-navigation-drawer
      app
      permanent
      expand-on-hover
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Sandra Adams
            </v-list-item-title>
            <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav>
        <div v-for="(link, i) in links" :key="i">
          <v-list-item
            v-if="!link.sublinks"
            :to="link.to"
            :active-class="color"
            avatar
            class="v-list-item"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-group
            v-else
            :key="link.text"
            no-action
            :prepend-icon="link.icon"
            :value="false"
          >
            <template v-slot:activator>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="sublink in link.sublinks"
              :to="sublink.to"
              :key="sublink.text"
            >
              <v-list-item-title>{{ sublink.text }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>

  <!-- <nav>
    <v-app-bar app>
      <v-toolbar-title>
        <span class="font-weight-light">Inventory</span>
        <span>Store</span>
      </v-toolbar-title>
      
      <div class="ml-5"></div>

      <navbar-dropdown
        v-if="isLoggedIn && (role === 'admin' || role === 'look')"
        list_name="List"
        :list_items="list_items"
        transition="slide-y-transition"
      />

      <navbar-dropdown
        v-if="isLoggedIn && (role === 'admin' || role === 'input') "
        list_name="Input"
        :list_items="input_items"
        transition="slide-x-transition"
      />

      <navbar-dropdown
        v-if="isLoggedIn && role === 'admin'"
        list_name="Keuangan"
        :list_items="finance_items"
        transition="slide-y-transition"
      />

      <router-link v-if="isLoggedIn && role === 'admin'" :to="{ name: 'stock-overview' }">
        <v-btn small depressed>Stok</v-btn>
      </router-link>

      <navbar-dropdown
        v-if="isLoggedIn && role === 'admin'"
        list_name="Admin"
        :list_items="admin_items"
        transition="slide-x-transition"
      />

      <v-spacer></v-spacer>

      <div v-if="!isLoggedIn">
        <router-link to="/login">
          <v-btn text>
            <span>Masuk</span>
            <v-icon right>mdi-login</v-icon>
          </v-btn>
        </router-link>
      </div>
      <div v-else>
        <v-btn text @click="logout">
          <span>Keluar</span>
          <v-icon right>mdi-logout</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
  </nav> -->
</template>

<script>
// import NavbarDropdown from './NavbarDropdown.vue';

export default {
  // components: { NavbarDropdown },
  data() {
    return {
      links: [
        {
          icon: "mdi-format-list-bulleted",
          text: "List",
          sublinks: [
            { text: "Barang Masuk", to: { name: "list-incomings" } },
            { text: "Barang Keluar", to: { name: "list-outgoings"} },
            { text: "Supplier", to: { name: "list-suppliers"} },
            { text: "Pembeli" , to: { name: "list-buyers"} },
            { text: "Produk", to: { name: "list-products"} }
          ],
        },
        {
          icon: "mdi-import",
          text: "Input",
          sublinks: [
            { text: "Barang Masuk", to: { name: "input-incoming" } },
            { text: "Barang Keluar", to: { name: "input-outgoing"} },
            { text: "Supplier", to: { name: "input-supplier"} },
            { text: "Pembeli" , to: { name: "input-buyer"} },
            { text: "Produk", to: { name: "input-product"} }
          ],
        },
        {
          icon: "mdi-cash-multiple",
          text: "Finance",
          sublinks: [
            { text: "Overview", to: { name: "finance-overview" } },
            { text: "Hutang", to: { name: "finance-debt"} },
          ],
        },
        {
          icon: "mdi-cog",
          text: "Admin",
          sublinks: [
            { text: "Akun", to: { name: "admin-accounts" } },
            { text: "Database", to: { name: "admin-database" } },
          ],
        },
      ],
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    role() {
      try {
        return this.$store.getters.user.role;
      }
      catch (e) {
        return null;
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace('/login');
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

</style>