<template lang="pug">
  v-layout
    v-flex(xs12)
      div
        v-dialog(v-model='dialog', max-width='500px')
          v-btn.mb-2(color='primary', dark='', slot='activator') Add {{ addText }}
          v-card
            v-card-title
              span.headline {{ formTitle }}
            v-card-text
              v-container(grid-list-md)
                v-layout(wrap)
                  v-flex(xs12)
                    v-text-field(label='Name', v-model='editedItem.name')
            v-card-actions
              v-spacer
              v-btn(color='blue darken-1', flat='', @click.native='close') Cancel
              v-btn(color='blue darken-1', flat='', @click.native='save') Save
        v-data-table.elevation-1(:headers='headers', :items='items', hide-actions='')
          template(slot='items', slot-scope='props')
            td {{ props.item.name }}
            td {{ props.item.modified }}
            td.layout.px-0.justify-center
              v-btn.mx-0(icon='', @click='editItem(props.item)')
                v-icon(color='teal') edit
              v-btn.mx-0(icon='', @click='deleteItem(props.item)')
                v-icon(color='pink') delete
          template(slot='no-data')
            v-alert(:value="true" color="error" icon="warning") Sorry, nothing to display here :(
            //v-btn(color='primary', @click='initialize') Reset

</template>

<script>
export default {
  name: 'Document',
  data: () => ({
    dialog: false,
    addText: '',
    currentRoute: window.location.pathname,
    headers: [
      {
        text: '',
        sortable: true,
        value: 'name'
      },
      { text: 'Modified', value: 'modified' },
      { text: 'Actions', value: 'name', sortable: false, align: 'center' }
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      name: ''
    },
    defaultItem: {
      name: ''

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
    this.headers[0].text = this.$route.name === 'Groups' ? 'Groups' : 'Files/Folders'
    this.addText = this.$route.name === 'Groups' ? 'Group' : 'Files/Folders'
    this.initialize()
  },

  methods: {
    initialize () {
      this.items = [
        {
          name: 'Frozen Yogurt',
          modified: new Date(-1).toLocaleDateString()
        },
        {
          name: 'Ice cream sandwich',
          modified: new Date().toLocaleDateString()
        },
        {
          name: 'Eclair',
          modified: new Date().toLocaleDateString()
        },
        {
          name: 'Cupcake',
          modified: new Date(1995).toLocaleDateString()
        },
        {
          name: 'Gingerbread',
          modified: new Date().toLocaleDateString()
        },
        {
          name: 'Jelly bean',
          modified: new Date().toLocaleDateString()
        },
        {
          name: 'Lollipop',
          modified: new Date('01/02/1963').toLocaleDateString()
        },
        {
          name: 'Honeycomb',
          modified: new Date('09/04/2020').toLocaleDateString()
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
