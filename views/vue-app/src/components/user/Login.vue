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
              v-btn(flat color='primary', :disabled='!valid' v-on:click='submit') Login
            v-alert(type='error', :value='errorMsg' transition="slide-y-transition") {{ errorMsg }}
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data: () => ({
    valid: true,
    menu: false,
    email: '',
    pwd: '',
    errorMsg: '',
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
              this.errorMsg = response.data.error
            }
          } else {
            this.$store.commit('login', response.data)
            this.$router.push('/')
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
