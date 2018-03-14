<template lang="pug">
  v-layout
    v-flex(xs12)
      v-expansion-panel(dark)
        v-expansion-panel-content(v-for='item in items', :key='item.title')
          div(slot='header')
            v-icon.mr-3(color='primary') {{ item.icon }}
            | {{ item.title }}
          v-card
            v-card-text
              | {{ item.text }}

</template>

<script>
export default {
  name: 'Help',
  data () {
    return {
      items: [
        {title: 'Getting Started', icon: 'announcement', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'},
        {title: 'What is UpShare ?', icon: 'announcement', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'},
        {title: 'Installation Method #1', icon: 'live_help', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'},
        {title: 'Installation Method #2', icon: 'live_help', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'},
        {title: 'How to use it?', icon: 'live_help', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'}
      ]
    }
  }
}
</script>

<style scoped>

</style>
