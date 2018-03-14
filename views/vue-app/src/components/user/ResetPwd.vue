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
              v-btn(flat color='primary', :disabled='!valid' v-on:click='submit') Reset
</template>

<script>
export default {
  name: 'ResetPwd',
  data: function () {
    return {
      valid: true,
      pwd: '',
      repwd: '',
      pwdRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 5) || 'Password length can be less than 6'
      ]
    }
  },
  props: ['token'],
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
