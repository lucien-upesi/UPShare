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
      FileUpload(help="Choose files", icon="file_upload", endpoint="/files", :extras="extras", v-on:response="update", multiple, v-if="folderId")
      v-tabs(v-model='active' color="primary", slider-color='accent')
        v-tab(v-for='n, index in tabs', :key='index')
          | {{ n.title }}
        v-tab-item(v-for='n, index in tabs', :key='index')
          div(@contextmenu="show")
            List(:files="ownFiles")
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
  name: 'Files',
  components: {List, FileUpload},
  props: ['folderId'],
  data: () => ({
    active: null,
    ownFiles: [],
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
  created () {
    this.getFiles()
  },
  watch: {
    folderId (id) {
      this.getFiles()
    }
  },
  mounted () {
    // console.log(this.folderId, "lol")
  },
  computed: {
    extras () {
      return {id: this.$store.state.user.user_id, inFolder: this.folderId}
    }
  },
  methods: {
    update (data) {
      console.log(data.success)
      this.ownFiles.concat(data.success)
      console.log(this.ownFiles)
    },
    addFolder () {
      if (this.$refs.form.validate()) {
        axios.put(`/files/folder`, {file_name: this.folder_name, inFolder: this.folderId}).then(response => {
          if (response.data.error) this.errorMsg = response.data.error
          else {
            this.dialog = false
            this.ownFiles.push(response.data)
          }
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
    },
    getFiles () {
      if (this.folderId) {
        axios.get(`/files/${this.folderId}`).then(response => {
          this.ownFiles = response.data
        })
      } else {
        axios.get('/users/ownFiles').then(response => {
          this.ownFiles = response.data
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
