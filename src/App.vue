<template>
  <v-app>
    <Navbar />
    <v-main class="ma-3">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: { Navbar },
  data: () => ({
    //
  }),
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    }
  },
  watch: {
    didAutoLogout(cur_value, old_value) {
      if (cur_value && cur_value !== old_value) {
        this.$router.replace('/login');
      }
    }
  }
};
</script>
