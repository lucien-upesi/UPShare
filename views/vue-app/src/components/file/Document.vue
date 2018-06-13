<template lang="pug">
  div.d-flex(style="width: 100%; height:100%; flex-direction: column")
    Back
    v-layout(wrap row v-if="type === 'document'")
      v-flex(xs12)
        iframe(:src="src", frameborder="0", scrolling="no" height="100%" width="100%")
    Files(v-else, :folderId="id")
</template>

<script>
import axios from 'axios'
import Files from '../file/Files.vue'
import Back from '../Back/Back.vue'
export default {
  name: 'Document',
  props: ['id', 'type'],
  components: {Files, Back},
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
