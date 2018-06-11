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
          transition(name='slide-y-transition')
            v-form.d-flex(v-if='!hidden')
              v-flex(xs10)
                v-text-field(prepend-icon='email' name='forgotEmail' label='Please enter your e-mail' v-model='emailForg')
              v-flex(xs2)
                v-btn(flat, color='primary', v-on:click='reset') OK
        v-card-actions
          v-spacer
            Alert(v-on:done="hideAlert" transitionName="slide-y-transition" :alertType="alertType", outlineMode=false, :visibility="alert", durationTime="2000")
              span {{ alertMsg }}
          v-btn(flat color='primary', :disabled='!valid' v-on:click='submit') Login
          //v-btn(flat, color='primary', v-on:click='reset') Forgot Password ?
          v-btn(flat, color='primary', v-on:click='hidden=!hidden') Forgot Password ?
</template>

<script>
import axios from 'axios'
import Alert from '../Alert/Alert'
export default {
  name: 'Login',
  components: {Alert},
  data: () => ({
    valid: true,
    hidden: true,
    menu: false,
    alert: false,
    alertIcon: '',
    alertMsg: '',
    alertType: 'error',
    email: '',
    emailForg: '',
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
    hideAlert () {
      this.alert = false
    },
    redirectTime (redirectionTime) {
      setTimeout(() => {
        this.$router.push('/account')
      }, Number(redirectionTime))
    },
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
            this.redirectTime(2000)
          }
        })
      }
    },
    reset () {
      axios.post('/users/sendConfirmation', {email: this.emailForg}).then(response => {
        if (response.data.error) {
          this.alert = true
          this.alertMsg = response.data.error
        } else {
          console.log('email OK')
          this.alert = true
          this.alertType = 'info'
          this.alertMsg = 'Email sent, Please check your email box !'
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
