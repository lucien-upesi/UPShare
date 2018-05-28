<template lang="pug">
  div
    FileUpload(help="Choose files", icon="file_upload", endpoint="/files", :extras="extras", v-on:response="update", multiple)
    v-tabs(v-model='active' color="primary", slider-color='accent')
      v-tab(v-for='n, index in tabs', :key='index')
        | {{ n.title }}
      v-tab-item(v-for='n, index in tabs', :key='index')
        v-card(flat)
          List(:filesType="n.filesType")
</template>

<script>
import List from './List.vue'
import FileUpload from './FileUpload.vue'
export default {
  name: 'Document',
  components: {List, FileUpload},
  data: () => ({
    active: null,
    tabs: [
      {title: 'My files', filesType: 'own'}, {title: 'Shared Files', filesType: 'shared'}
    ]
  }),
  computed: {
    extras () {
      return {id: this.$store.state.user.user_id}
    }
  },
  methods: {
    update (data) {
      console.log(data)
    }
  }
}
</script>

<style scoped>

</style>
