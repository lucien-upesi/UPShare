<template lang="pug">
  div
    h2 Dossiers
    h2 Fichiers

</template>

<script>
import axios from 'axios'
export default {
  name: 'List',
  props: ['filesType'],
  data: () => ({
    ownFiles: false
  }),
  created () {
    axios.get('/users/ownFiles').then(response => {
      this.ownFiles = response.data
    })
  }
}
</script>

<style scoped>

</style>
