<template>
  <v-alert
    :type="type"
    prominent
    elevation="2"
    transition="scale-transition"
  >
    <v-row align="center">
      <v-col class="grow">
        {{ text }}
      </v-col>
      <v-col class="shrink">
        <v-btn 
          text 
          color="white--text"
          fab
          small
          @click="removeAlert"
          >
            <v-icon>mdi-close-box</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  name: 'Alert',
  props: [ 'type', 'text' ],
  methods: {
    removeAlert() {
      this.$emit('remove-alert');
    }
  }
}
</script>

<style>

</style>