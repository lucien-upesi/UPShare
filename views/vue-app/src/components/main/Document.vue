<template lang="pug">
  v-layout
    v-flex(xs12)
      CrudBoard(:headers="headers", :endpoints="endpoints" db-table-name="team", prefix="team", :actions="actions")

</template>

<script>
import CrudBoard from '../CrudBoard/CrudBoard.vue'
import ActionsTeam from '../main/ActionsTeam.vue'
export default {
  name: 'Document',
  components: {
    CrudBoard, ActionsTeam
  },
  data: () => ({
    headers: [
      {text: 'ID', sortable: true, value: 'team_id', type: 'number', doNotUse: true},
      {text: 'Name', sortable: true, value: 'team_name', type: 'text'},
      {text: 'Grade', sortable: true, value: 'grd_name', type: 'text', doNotUse: true},
      {text: 'Actions', sortable: false, align: 'center', doNotUse: true}
    ],
    endpoints: {
      put: '/teams',
      get: '/users/teams',
      post: '/teams',
      erase: '/teams'
    },
    actions: ActionsTeam
  })
}
</script>

<style scoped>

</style>
