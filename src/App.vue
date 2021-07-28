<template>
  <v-app>
    <Navbar />
    <v-main class="ma-3">
      <Alert
        v-if="alert_visible"
        :type="alert_type"
        :text="alert_text"
        @remove-alert="removeAlert"
      />
      <router-view
        @trigger-alert="showAlert"
      />
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

import Alert from '@/components/Alert.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: { Alert, Navbar },
  data: () => ({
    alert_visible: false,
    alert_type: "",
    alert_text: ""
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
  },
  methods: {
    showAlert(type, text) {
      this.alert_type = type;
      this.alert_text = text;
      this.alert_visible = true;
    },
    removeAlert() {
      this.alert_visible = false;
    },
    checkBackendHealth() {
      axios.get("utils/checkhealth/")
        .catch((error) => {
          this.alert_type = "error";
          this.alert_text = "Server backend sedang tidak aktif. Fungsionalitas website ini akan terganggu.";
          this.alert_visible = true;
          console.log(error);
        })
    }
  },
  mounted() {

    // Check health when instantiated then every 30 seconds
    this.checkBackendHealth();
    setInterval(function() {
      this.checkBackendHealth();
    }.bind(this), 30000);
  }
};
</script>
