<template lang="pug">
  v-layout(align-center='', justify-center='')
    v-flex(xs12, md8)
      v-card.elevation-12
        v-toolbar(dark='', color='primary')
          v-toolbar-title Set your new password
          v-spacer
        v-card-text
          v-form#form(v-model="valid" ref="form" lazy-validation)
            v-text-field(prepend-icon='lock', name='password', label='New Password', type='password', :rules="pwdRules", v-model="pwd" required)
            v-text-field#password(prepend-icon='lock', name='repassword', label='Confirm', type='password', :rules='pwdRules', v-model="repwd" required)

            v-card-actions
              v-spacer
                Alert(v-on:done="hideAlert" transitionName="slide-y-transition" :alertType="alertType", outlineMode=false, :visibility="alert", durationTime="2000")
                  span {{ alertMsg }}
              v-btn(flat color='primary', :disabled='!valid' v-on:click='submit') Reset
</template>

<script>
import axios from 'axios'
import Alert from '../Alert/Alert'
export default {
  name: 'ResetPwd',
  components: {Alert},
  data: function () {
    return {
      valid: true,
      alert: false,
      alertIcon: '',
      alertMsg: '',
      alertType: 'error',
      pwd: '',
      repwd: '',
      oldpwd: '',
      pwdRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 5) || 'Password length can be less than 6'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  props: ['token'],
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        axios.post(`/users/resetPassword`, {token: this.$route.params.token, pwd: this.pwd, repwd: this.repwd}).then(response => {
          if (response.data.hasOwnProperty('error')) {
            if (response.data.error) {
              this.alert = true
              this.alertMsg = response.data.error
            }
          } else {
            this.alert = true
            this.alertType = 'success'
            this.alertMsg = 'Password successfully changed !'
            this.redirectTime(3000)
          }
        }).catch(() => {
          this.errorMsg = 'Une erreur est survenue'
        })
      }
    },
    hideAlert () {
      this.alert = false
    },
    redirectTime (redirectionTime) {
      setTimeout(() => {
        this.$router.push('/login')
      }, Number(redirectionTime))
    }
  }
}
</script>

<style scoped>

</style>
