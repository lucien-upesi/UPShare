<template lang="pug">
  div
    h2 Dossiers
    div
      v-btn(v-for="file in ownFiles", :key="file.file_id" v-if="file.file_folder === 1" flat :to='"/document/"+file.file_id')
        v-icon folder
        | {{file.file_name}}

    h2 Fichiers
    div
      v-btn(v-for="file in ownFiles", :key="file.file_id" v-if="file.file_folder === 0" flat :to='"/document/"+file.file_id') {{file.file_name}}
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
    if (this.filesType === 'own') {
      axios.get('/users/ownFiles').then(response => {
        this.ownFiles = response.data
      })
    }
  }
}
</script>

<style scoped>

</style>
