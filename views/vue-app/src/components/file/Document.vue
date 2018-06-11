<template lang="pug">
    v-layout(style="margin:0px;padding:0px;overflow:hidden")
      v-flex(xs12)
        iframe(:src="src", frameborder="0", scrolling="no" height="100%" width="100%" v-if="type === 'document'")
        Files(v-else, :folderId="id")
</template>

<script>
import axios from 'axios'
import Files from '../file/Files.vue'
export default {
  name: 'Document',
  props: ['id', 'type'],
  components: {Files},
  data: () => ({
    src: null
  }),
  watch: {
    id (id) {
      this.getFile(id)
    }
  },
  methods: {
    getFile (id) {
      if (this.type !== 'folder') {
        axios.get(`/files/${id}`, {responseType: 'blob'}).then(response => {
          this.src = window.URL.createObjectURL(response.data)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
