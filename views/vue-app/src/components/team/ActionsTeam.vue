<template lang="pug">
  div
    v-btn.mx-0(icon, @click.stop="dialog = true", v-if="row.grd_name === 'OWNER' || row.grd_name === 'ADMIN'")
      v-icon(color='green') person_add
    v-btn.mx-0(icon, :to="toFiles")
      v-icon(color='blue') folder
    v-dialog(v-model='dialog', max-width='500px')
      v-card
        v-toolbar(color='primary')
          v-toolbar-title Invite someone
        v-card-text
          v-form(v-model="valid" ref="form" lazy-validation)
            v-text-field(prepend-icon='email', label='E-mail', type='email', :rules="emailRules", v-model="email")
        v-card-actions
          v-spacer
          v-btn(color='red', flat, @click.stop='dialog = false') Close
          v-btn(color='green', flat, @click.stop='addUserToGroup') Send
</template>

<script>
import axios from 'axios'
export default {
  name: 'ActionsTeam',
  props: ['row'],
  data: () => ({
    dialog: false,
    email: '',
    emailRules: [
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    valid: false
  }),
  computed: {
    toFiles () {
      return `/teams/${this.row.team_id}/files`
    }
  },
  methods: {
    addUserToGroup () {
      if (this.$refs.form.validate()) {
        axios.post(`/teams/${this.row.team_id}/inviteMember`, { user_email: this.email, team_name: this.row.team_name}).then(response => {
          if (response.data.error) this.errorMsg = response.data.error
          else this.dialog = false
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
