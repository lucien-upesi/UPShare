<template lang="pug">
  v-layout(align-center='', justify-center='')
    v-flex(xs12, md8)
      v-card.elevation-12
        v-toolbar(color='primary')
          v-toolbar-title Set your new password
          v-spacer
        v-card-text
          v-form#form(v-model="valid" ref="form" lazy-validation)
            v-text-field(prepend-icon='lock', name='oldpassword', label='Old Password', type='password', :rules="pwdRules", v-model="oldpwd" required)
            v-text-field(prepend-icon='lock', name='password', label='New Password', type='password', :rules="pwdRules", v-model="pwd" required)
            v-text-field#password(prepend-icon='lock', name='repassword', label='Confirm New Password', type='password', :rules='pwdRules', v-model="repwd" required)

            v-card-actions
              v-spacer
              v-btn(flat color='primary', :disabled='!valid' v-on:click='submit') Reset
</template>

<script>
import axios from 'axios'
export default {
  name: 'ChangePwd',
  data: function () {
    return {
      valid: true,
      pwd: '',
      id: '',
      repwd: '',
      oldpwd: '',
      pwdRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 5) || 'Password length can be less than 6'
      ]
    }
  },
  computed: {
    /* Function to retrieve data stored in $store */
    user: function () {
      return this.$store.state.user
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        axios.post('/users/changePassword', {oldpwd: this.oldpwd, pwd: this.pwd, id: this.user.user_id}).then(response => {
          if (response.data.hasOwnProperty('error')) {
            if (response.data.error) {
              this.errorMsg = response.data.error
            }
          } else {
            //this.$store.commit('changePassword', response.data)
            this.$router.push('account')
          }
        }).catch(() => {
          this.errorMsg = 'Une erreur est survenue'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
