<template lang="pug">
    v-layout(style="margin:0px;padding:0px;overflow:hidden")
      v-flex(xs12)
        iframe(:src="src", frameborder="0", scrolling="no" height="100%" width="100%")
</template>

<script>
import axios from 'axios'
export default {
  name: 'Document',
  props: ['id'],
  data: () => ({
    src: ''
  }),
  mounted () {
    axios.get(`/files/${this.id}`, {responseType: 'blob'}).then(response => {
      this.src = window.URL.createObjectURL(response.data)
    })
  }
}
</script>

<style scoped>

</style>
