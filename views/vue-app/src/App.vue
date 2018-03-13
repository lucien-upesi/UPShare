<template lang="pug">
  v-app
    Navigation(app)
    v-content
      v-container(fluid, fill-height, :class="{'pa-0': $vuetify.breakpoint.smAndDown}")
        router-view
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
