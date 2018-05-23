<template lang="pug">
  div
    v-tabs(v-model='active' color="primary", slider-color='accent')
      v-tab(v-for='n, index in tabs', :key='index')
        | {{ n.title }}
      v-tab-item(v-for='n, index in tabs', :key='index')
        v-card(flat)
          List(:filesType="n.filesType")


</template>

<script>
import List from './List.vue'
export default {
  name: 'Document',
  components: {List},
  data: () => ({
    active: null,
    tabs: [
      {title: 'My files', filesType: 'own'}, {title: 'Shared Files', filesType: 'shared'}
    ]
  })
}
</script>

<style scoped>

</style>
