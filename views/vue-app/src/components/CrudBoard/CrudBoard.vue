<template lang="pug">
    div
      v-alert(type='error', :value='errorMsg' transition="slide-y-transition") {{ errorMsg }}
      v-dialog(v-model='dialog', max-width='500px')
        v-btn.mb-2(color='green', dark, slot='activator') Add
        v-card
          v-card-title
            span.headline {{ formTitle }}
          v-card-text
            v-container(grid-list-md)
              v-layout(wrap)
                v-flex(xs12 v-for="item, index in headers", :key="index")
                  v-text-field(:label='getLabel(headers[index])', v-model='editedItem[item.value]' v-if="!item.doNotUse")
          v-card-actions
            v-spacer
            v-btn(color='red darken-1', flat='', @click.native='close') Cancel
            v-btn(color='blue darken-1', flat='', @click.native='save') Save
      v-data-table.elevation-1(:headers='headers', :items='items', hide-actions)
        template(slot='items', slot-scope='props')
          td(v-for="value, index in props.item") {{ value }}
          td.layout.px-0.justify-center
            v-btn.mx-0(icon='', @click='editItem(props.item)')
              v-icon(color='teal') edit
            v-btn.mx-0(icon='', @click='deleteItem(props.item)')
              v-icon(color='pink') delete
        template(slot='no-data')
          v-alert(:value="true" type='warning' icon="warning") Sorry, nothing to display here :(

</template>

<script>
import axios from 'axios'
export default {
  name: 'CrudBoard',
  props: ['headers', 'endpoint', 'dbTableName', 'prefix'],
  data: () => ({
    dialog: false,
    addText: '',
    errorMsg: '',
    items: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {}
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? `New ${this.dbTableName.toUpperCase()}` : `Edit ${this.dbTableName.toUpperCase()}`
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
      axios.get(this.endpoint).then(result => {
        if (Array.isArray(result.data)) this.items = result.data
      })
    },
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const self = this
      const index = this.items.indexOf(item)
      console.log(this.items[index][this.prefix + '_id'])
      axios.delete(`${this.endpoint}/${this.items[index][this.prefix + '_id']}`).then(result => {
        if (result.data.error) {
          self.errorMsg = result.data.error
        } else if (result.data.id) {
          this.items.splice(index, 1)
        }
      })
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
        axios.post(`${this.endpoint}/${this.items[this.editedIndex][this.prefix + '_id']}`, this.editedItem).then(response => {
          if (response.data.error) {
            this.errorMsg = response.data.error
          } else {
            Object.assign(this.items[this.editedIndex], this.editedItem)
            this.close()
            this.errorMsg = false
          }
        })
      } else {
        axios.put(this.endpoint, this.editedItem).then(response => {
          if (response.data.error) {
            this.errorMsg = response.data.error
          } else {
            const item = {}
            item[this.prefix + '_id'] = response.data.id
            this.items.push(Object.assign(item, this.editedItem))
            this.close()
            this.errorMsg = false
          }
        })
      }
    },
    getLabel (value) {
      return value.text.toString()
    }
  }
}
</script>

<style scoped>

</style>
