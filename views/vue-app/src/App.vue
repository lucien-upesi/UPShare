<template lang="pug">
  v-app
    v-navigation-drawer(app)
    v-toolbar(app)
    v-content
      v-container(fluid, fill-height, :class="{'pa-0': $vuetify.breakpoint.smAndDown}")
        router-view
    v-footer(app)
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{
  font-family: 'Roboto', sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
