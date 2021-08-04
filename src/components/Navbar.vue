<template>
    <v-navigation-drawer
      app
      permanent
      expand-on-hover
      dark
      class="primary"
      v-if="isLoggedIn"
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
              {{ username }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ role }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav>
        <div v-for="(link, i) in links" :key="i">
          <div v-if="link.roles.includes(role)">
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
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item>

            <v-list-group
              v-else
              :key="link.text"
              no-action
              color="white"
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
        </div>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="error" @click="logout">
            Keluar
          </v-btn>
        </div>
      </template>

    </v-navigation-drawer>

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
          roles: ["admin", "look"],
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
          roles: ["admin", "input"],
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
          roles: ["admin"],
          sublinks: [
            { text: "Overview", to: { name: "finance-overview" } },
            { text: "Hutang", to: { name: "finance-debt"} },
          ],
        },
        {
          icon: "mdi-archive",
          text: "Stock",
          roles: ["admin"],
          to: { name: "stock-overview" }
        },
        {
          icon: "mdi-cog",
          text: "Admin",
          roles: ["admin"],
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
    username() {
      return this.$store.getters.user.username;
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