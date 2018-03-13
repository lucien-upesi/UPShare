<template lang="pug">
div
  v-navigation-drawer(class='grey darken-3', width='200', dark, fixed='', v-model='drawer', app='')
    v-list.pa-1
      v-list-tile(avatar='')
        v-list-tile-avatar
          img(src='https://randomuser.me/api/portraits/men/85.jpg')
        v-list-tile-content
          v-list-tile-title John Leider
    v-list.pt-0(dense='')
      v-divider
      v-list-tile(v-for='item in items', :key='item.title', :to= 'item.to')
        v-list-tile-action
          v-icon {{ item.icon }}
        v-list-tile-content
          v-list-tile-title {{ item.title }}
      v-divider
    v-spacer
  v-toolbar(color='grey darken-3', dark='', fixed='', app='')
    v-toolbar-side-icon(@click.stop='drawer = !drawer')
    v-toolbar-title UpShare
      v-icon swap_vert
    v-tooltip(bottom) Home
      v-btn(icon, to='home', flat, slot='activator')
        v-icon home
    v-tooltip(bottom) Files
      v-btn(icon, to='files', flat, slot='activator')
        v-icon insert_drive_file
    v-tooltip(bottom) Groups
      v-btn(icon, to='groups', flat, slot='activator')
        v-icon people
    v-spacer
    v-tooltip(bottom) Help
      v-btn(icon, to='help', flat, slot='activator')
        v-icon help
    v-tooltip(bottom) Settings
      v-btn(icon, to='account', flat, slot='activator')
        v-icon settings
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
        {title: 'Groups', icon: 'people', to: 'groups'},
        {title: 'Help', icon: 'help', to: 'help'},
        {title: 'About', icon: 'question_answer', to: 'about'}
      ]
    }
  }
}
</script>

<style scoped>

</style>
