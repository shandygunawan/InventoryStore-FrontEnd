<template>
  <v-alert
    :type="type"
    dismissible
    elevation="2"
    transition="scale-transition"
  >
  {{ text }}
  </v-alert>
</template>

<script>
export default {
  name: 'Alert',
  props: [ 'type', 'text' ]
}
</script>

<style>

</style>