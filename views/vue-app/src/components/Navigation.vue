<template lang="pug">
div
  v-navigation-drawer(class='grey darken-3', width='200', dark, fixed, v-model='drawer', app)
    v-list.pa-1(v-if='user')
      v-list-tile-content
        v-list-tile-title Welcome, {{ user.user_first_name }} {{ user.user_last_name }}
    v-list.pt-0(dense)
      v-divider
      v-list-tile(v-for='item in items', :key='item.title', :to= 'item.to')
        v-list-tile-action
          v-icon {{ item.icon }}
        v-list-tile-content
          v-list-tile-title {{ item.title }}
      v-divider
      v-list-tile(v-for='setting in settings', :key='setting.title', :to= 'setting.to')
        v-list-tile-action
          v-icon {{ setting.icon }}
        v-list-tile-content
          v-list-tile-title {{ setting.title }}
      v-list-tile(v-if="user", @click="logout")
        v-list-tile-action
          v-icon person_outline
        v-list-tile-content
          v-list-tile-title Disconnect
    v-spacer
  v-toolbar(:extended='extend', color='grey darken-3', dark, fixed, app)
    v-toolbar-side-icon(@click.stop='drawer = !drawer')
    v-toolbar-title UpShare
      v-icon swap_vert
    v-spacer
    v-spacer
    div(:style='centered', :slot='extension')
      v-text-field(prepend-icon='search', label='search', flat)
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      drawer: null,
      /* List of tile in Drawer Menu */
      items: [
        {title: 'Home', icon: 'dashboard', to: 'home'},
        {title: 'Files', icon: 'insert_drive_file', to: 'files'},
        {title: 'Groups', icon: 'people', to: 'groups'}
      ],
      /* Sub Drawer menu with settings */
      settings: [
        {title: 'Settings', icon: 'settings', to: 'account'},
        {title: 'Help', icon: 'help', to: 'help'},
        {title: 'About', icon: 'question_answer', to: 'about'}
      ]
    }
  },
  computed: {
    // Function to extend toolbar w/mobile view
    extend: function () {
      return this.$vuetify.breakpoint.smAndDown
    },
    // Function to set searchField on second line w/mobile view
    extension: function () {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 'extension'
      } return 'default'
    },
    // Function to center searchField w/sm & xs view
    centered: function () {
      if (this.$vuetify.breakpoint.sm) {
        return 'padding-left: 15px; padding-right: 15px; width:100%;'
      } else if (this.$vuetify.breakpoint.xs) {
        return 'padding-left: 25px; padding-right: 25px; width:100%;'
      } return ''
    },
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
