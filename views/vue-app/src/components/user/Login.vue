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
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    valid: true,
    menu: false,
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
        // Native form submission is not yet supported

      }
    }
  }
}
</script>

<style scoped>

</style>
