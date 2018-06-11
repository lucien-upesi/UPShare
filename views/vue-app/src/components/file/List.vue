<template lang="pug">
  div
    h2 Dossiers
    div
      v-btn(v-for="file in files", :key="file.file_id" v-if="file.file_folder === 1" flat :to='"/explore/folder/"+file.file_id')
        v-icon folder
        | {{file.file_name}}

    h2 Fichiers
    div
      v-btn(v-for="file in files", :key="file.file_id" v-if="file.file_folder === 0" flat :to='"/explore/document/"+file.file_id') {{file.file_name}}
</template>

<script>
export default {
  name: 'List',
  props: ['files'],
  data: () => ({
  }),
  created () {
  }
}
</script>

<style scoped>

</style>
