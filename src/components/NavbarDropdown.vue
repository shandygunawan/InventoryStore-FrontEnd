<template>
  <v-menu offset-y :transition="transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn small depressed v-bind="attrs" v-on="on">{{ list_name }}</v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in list_items"
        :key="index"
      >
        <router-link :to="item.route">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </router-link>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: ['list_name', 'list_items', 'transition']
}
</script>

<style scoped>
a {
    text-decoration: none;
}
</style>