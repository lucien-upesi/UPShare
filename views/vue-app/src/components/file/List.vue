<template lang="pug">
  div
    h2 Dossiers
    div(v-for="file in ownFiles", v-if="file.file_folder === 1")
      h4 {{file.file_name}}

    h2 Fichiers
    div(v-for="file in ownFiles" v-if="file.file_folder === 0")
      h4 {{ file.file_name }}
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
