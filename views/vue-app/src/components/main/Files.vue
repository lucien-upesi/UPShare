<template lang="pug">
  v-layout
    v-flex(xs12, md8)
      div
        v-dialog(v-model='dialog', max-width='500px')
          v-btn.mb-2(color='primary', dark='', slot='activator') New File
          v-card
            v-card-title
              span.headline {{ formTitle }}
            v-card-text
              v-container(grid-list-md)
                v-layout(wrap)
                  v-flex(xs12, sm6, md4)
                    v-text-field(label='File/folder name', v-model='editedItem.name')
                  v-flex(xs12='', sm6='', md4='')
                    v-text-field(label='Modified', v-model='editedItem.modified')
            v-card-actions
              v-spacer
              v-btn(color='blue darken-1', flat='', @click.native='close') Cancel
              v-btn(color='blue darken-1', flat='', @click.native='save') Save
        v-data-table.elevation-1(:headers='headers', :items='items', hide-actions='')
          template(slot='items', slot-scope='props')
            td {{ props.item.name }}
            td.text-xs-right {{ props.item.modified }}
            td.justify-center.layout.px-0
              v-btn.mx-0(icon='', @click='editItem(props.item)')
                v-icon(color='teal') edit
              v-btn.mx-0(icon='', @click='deleteItem(props.item)')
                v-icon(color='pink') delete
          template(slot='no-data')
            v-btn(color='primary', @click='initialize') Reset

</template>

<script>
export default {
  name: 'Files',
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Files/Folders',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Name', value: 'filename' },
      { text: 'Modified', value: 'modified' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      filename: 'Unnamed file',
      modified: 0
    },
    defaultItem: {
      name: '',
      filename: '',
      modified: 0

    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.items = [
        {
          name: 'Frozen Yogurt',
          modified: 159
        },
        {
          name: 'Ice cream sandwich',
          modified: 237
        },
        {
          name: 'Eclair',
          modified: 262
        },
        {
          name: 'Cupcake',
          modified: 305
        },
        {
          name: 'Gingerbread',
          modified: 356
        },
        {
          name: 'Jelly bean',
          modified: 375
        },
        {
          name: 'Lollipop',
          modified: 392
        },
        {
          name: 'Honeycomb',
          modified: 408
        }
      ]
    },

    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style scoped>

</style>
