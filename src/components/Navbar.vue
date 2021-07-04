<template>
  <nav>
    <v-app-bar app>
      <v-toolbar-title>
        <span class="font-weight-light">Inventory</span>
        <span>Store</span>
      </v-toolbar-title>
      
      <div class="ml-5"></div>

      <navbar-dropdown
        v-if="isLoggedIn && role === 'admin'"
        list_name="List"
        :list_items="list_items"
        transition="slide-y-transition"
      />

      <navbar-dropdown
        v-if="isLoggedIn && role === 'admin'"
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

      <router-link v-if="isLoggedIn && role === 'admin'" to="/stock">
        <v-btn small depressed>Stok</v-btn>
      </router-link>

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
        { title: "Barang Masuk", route: "/incomings" },
        { title: "Barang Keluar", route: "/outgoings" },
        { title: "Supplier", route: "/suppliers" },
        { title: "Pembeli" , route: "/buyers"},
        { title: "Produk", route: "/products" }
      ],
      input_items: [
        { title: "Barang Masuk", route: "/input/incoming" },
        { title: "Barang Keluar", route: "/input/outgoing" },
        { title: "Supplier", route: "/input/supplier" },
        { title: "Pembeli" , route: "/input/buyer"},
        { title: "Produk", route: "/input/product" }
      ],
      finance_items: [
        { title: "Overview", route: "/finance" },
        { title: "Hutang", route: "/finance/debt" },
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