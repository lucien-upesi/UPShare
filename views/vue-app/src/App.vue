<template lang="pug">
  v-app
   Navigation(app)
   v-content
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
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body{
  font-family: 'Roboto', sans-serif
}
</style>
