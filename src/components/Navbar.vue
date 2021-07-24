<template>
  <nav>
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
  </nav>
</template>

<script>
import NavbarDropdown from './NavbarDropdown.vue';

export default {
  components: { NavbarDropdown },
  data() {
    return {
      list_items: [
        { title: "Barang Masuk", route: { name: "list-incomings" } },
        { title: "Barang Keluar", route: { name: "list-outgoings"} },
        { title: "Supplier", route: { name: "list-suppliers"} },
        { title: "Pembeli" , route: { name: "list-buyers"} },
        { title: "Produk", route: { name: "list-products"} }
      ],
      input_items: [
        { title: "Barang Masuk", route: { name: "input-incoming" } },
        { title: "Barang Keluar", route: { name: "input-outgoing" } },
        { title: "Supplier", route: { name: "input-supplier" } },
        { title: "Pembeli" , route: { name: "input-buyer" } },
        { title: "Produk", route: { name: "input-product" } }
      ],
      finance_items: [
        { title: "Overview", route: { name: "finance-overview" } },
        { title: "Hutang", route: { name: "finance-debt"} },
      ],
      admin_items: [
        { title: "Akun", route: { name: "admin-accounts" } },
        { title: "Database", route: { name: "admin-database" } },
      ]
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