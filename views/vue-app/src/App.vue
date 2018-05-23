<template lang="pug">
  v-app
    Navigation(app)
    v-content
      v-container(fluid, :class="{'pa-0': $vuetify.breakpoint.smAndDown}")
        router-view(:key="$route.name")
    v-footer(app)
</template>

<script>
import Navigation from './components/Navigation'
export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<style>
body{
  font-family: 'Roboto', sans-serif;
}
</style>
