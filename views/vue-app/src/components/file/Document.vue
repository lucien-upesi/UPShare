<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12)
      v-dialog(v-model='dialog', max-width='500px')
        v-card
          v-toolbar(color='primary')
            v-toolbar-title Add folder
          v-card-text
            v-form(v-model="valid" ref="form" lazy-validation)
              v-text-field(prepend-icon='folder', label='Folder name', type='text', :rules="nameRules", v-model="folder_name")
          v-card-actions
            v-spacer
            v-btn(color='red', flat, @click.stop='close') Close
            v-btn(color='green', flat, @click.stop='addFolder') Add
      FileUpload(help="Choose files", icon="file_upload", endpoint="/files", :extras="extras", v-on:response="update", multiple)

      v-tabs(v-model='active' color="primary", slider-color='accent')
        v-tab(v-for='n, index in tabs', :key='index')
          | {{ n.title }}
        v-tab-item(v-for='n, index in tabs', :key='index')
          div(@contextmenu="show")
            List(:filesType="n.filesType")
            v-menu(v-model='showMenu', :position-x='x', :position-y='y', offset-y, absolute)
              v-list
                v-list-tile(v-for='(item, index) in items', :key='index', @click='actions(item.action)')
                  v-list-tile-title {{ item.title }}
</template>

<script>
import List from './List.vue'
import FileUpload from './FileUpload.vue'
import axios from 'axios'
export default {
  name: 'Document',
  components: {List, FileUpload},
  data: () => ({
    active: null,
    tabs: [
      {title: 'My files', filesType: 'own'}, {title: 'Shared Files', filesType: 'shared'}
    ],
    dialog: false,
    valid: false,
    folder_name: '',
    nameRules: [
      v => !!v || 'Name is required'
    ],
    showMenu: false,
    x: 0,
    y: 0,
    items: [
      { title: 'Add folder',
        action: 'openDialog'
      }
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
    },
    addFolder () {
      if (this.$refs.form.validate()) {
        axios.put(`/files/folder`, {file_name: this.folder_name}).then(response => {
          if (response.data.error) this.errorMsg = response.data.error
          else this.dialog = false
        })
      }
    },
    show (e) {
      e.preventDefault()
      this.showMenu = false
      this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
    actions (action) {
      this[action]()
    },
    openDialog () {
      this.dialog = true
    },
    close () {
      this.dialog = false
      this.folder_name = ''
    }
  }
}
</script>

<style scoped>

</style>
