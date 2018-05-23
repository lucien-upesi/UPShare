<template lang="pug">
  v-layout(align-center, justify-center)
    v-flex(xs12, md8)
      v-card.elevation-12
        v-toolbar(dark, color='primary')
          v-toolbar-title Invitation
          v-spacer
        v-card-text

        v-card-actions
          v-spacer
          // v-btn(flat, color='error', v-on:click="decline") Decline
          v-btn(color='success', v-on:click='accept') Accept
          // v-alert(type='error', :value='errorMsg' transition="slide-y-transition") {{ errorMsg }}
</template>

<script>
import axios from 'axios'
export default {
  name: 'Invitation',
  methods: {
    accept () {
      axios.post('/users/join', {team_id: this.$route.params.teamId, token: this.$route.params.token})
        .then(response => {
          if (response.data.success) {
            this.$router.push('/teams')
          }
        })
        .catch(e => console.log(e))
    },
    decline () {

    }
  }
}
</script>

<style scoped>

</style>
