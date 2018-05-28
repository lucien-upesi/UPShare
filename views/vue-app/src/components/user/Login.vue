<template lang="pug">
  v-layout(align-center='', justify-center='')
    v-flex(xs12, md8)
      v-card.elevation-12
        v-toolbar(dark='', color='primary')
          v-toolbar-title Log In
          v-spacer
        v-card-text
          v-form#form(v-model="valid" ref="form" lazy-validation)
            v-text-field(prepend-icon='email', name='email', label='E-mail', type='email', :rules="emailRules", v-model="email" required)
            v-text-field#password(prepend-icon='lock', name='password', label='Password', type='password', :rules='pwdRules', v-model="pwd" required)

        v-card-actions
          v-spacer
            Alert(v-on:done="hideAlert" transitionName="slide-y-transition" :alertType="alertType", outlineMode=false, :visibility="alert", durationTime="2000")
              span {{ alertMsg }}
          v-btn(flat color='primary', :disabled='!valid' v-on:click='submit') Login
              // v-btn(flat, color='primary') Forgot Password ?
</template>

<script>
import axios from 'axios'
import Alert from '../Alert/Alert'
export default {
  name: 'Login',
  components: {Alert},
  data: () => ({
    valid: true,
    menu: false,
    alert: false,
    alertIcon: '',
    alertMsg: '',
    alertType: 'error',
    email: '',
    pwd: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    pwdRules: [
      v => !!v || 'Password is required'
    ]
  }),
  methods: {

    submit () {
      if (this.$refs.form.validate()) {
        axios.post('/users/login', {email: this.email, password: this.pwd}).then(response => {
          if (response.data.hasOwnProperty('error')) {
            if (response.data.error) {
              this.alert = true
              this.alertMsg = response.data.error
            }
          } else {
            this.alert = true
            this.alertType = 'success'
            this.alertMsg = 'Successfully logged !'
            this.$store.commit('login', response.data)
            this.redirectTime(5000)
          }
        }).catch(() => {
          this.alertMsg = 'Une erreur est survenue'
        })
      }
    },
    hideAlert () {
      this.alert = false
    },
    redirectTime (redirectionTime) {
      setTimeout(() => {
        this.$router.push('/account')
      }, Number(redirectionTime))
    }
  }
}
</script>

<style scoped>

</style>
