<template lang="pug">
  v-layout
    v-flex(xs12)
      CrudBoard(:headers="headers" endpoint="/teams" db-table-name="team", prefix="team")

</template>

<script>
import CrudBoard from '../CrudBoard/CrudBoard.vue'
export default {
  name: 'Document',
  components: {
    CrudBoard
  },
  data: () => ({
    headers: [
      {text: 'ID', sortable: true, value: 'team_id', type: 'number', doNotUse: true},
      {text: 'Name', sortable: true, value: 'team_name', type: 'text'},
      {text: 'Actions', sortable: false, align: 'center', doNotUse: true}
    ]
  })
}
</script>

<style scoped>

</style>
