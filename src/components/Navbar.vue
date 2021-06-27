<template>
  <nav>
    <v-app-bar app>
      <v-toolbar-title>
        <span class="font-weight-light">Inventory</span>
        <span>Store</span>
      </v-toolbar-title>
      
      <router-link v-if="role === 'admin'" to="/dashboard">
        <v-btn small depressed class="ml-5 mr-2">Dashboard</v-btn>
      </router-link>
      
      <navbar-dropdown
        v-if="role === 'admin' || role === 'list'"
        list_name="List"
        :list_items="list_items"
        transition="slide-y-transition"
      />

      <navbar-dropdown
        v-if="role === 'admin' || role === 'input'"
        list_name="Input"
        :list_items="input_items"
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
      ]
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    role() {
      return this.$store.getters.user.role;
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