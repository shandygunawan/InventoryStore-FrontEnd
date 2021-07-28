<template>
  <v-app>
    <Navbar />
    <v-main class="ma-3">
      <Alert
        v-if="alert_visible"
        :type="alert_type"
        :text="alert_text"
      />
      <router-view
        @trigger-alert="onTriggerAlert"
      />
    </v-main>
  </v-app>
</template>

<script>
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
    onTriggerAlert(type, text) {
      this.alert_type = type;
      this.alert_text = text;
      this.alert_visible = true;
    }
  }
};
</script>
