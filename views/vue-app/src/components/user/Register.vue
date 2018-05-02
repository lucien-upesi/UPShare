<template lang="pug">
    v-layout
      v-flex(xs12)
        v-card.elevation-12
          v-toolbar(color='primary')
            v-toolbar-title {{ titleSubmitText }}
            v-spacer
          v-card-text
            v-form#form(v-model="valid" ref="form" lazy-validation)
              v-text-field(prepend-icon='person', label='First Name', v-model="firstName", :rules='nameRules', required, autocomplete='given-name')
              v-text-field(prepend-icon='person', label='Last Name', v-model="lastName", :rules='nameRules', required, autocomplete='family-name')
              v-menu(ref="menu", lazy='', :close-on-content-click='false', v-model="menu", transition='scale-transition', offset-y='', full-width='', :nudge-right='40', min-width='290px')
                v-text-field(slot="activator", label='Birthday date', v-model="birthday", prepend-icon='event', readonly, :rules='pickRules', autocomplete='bday')
                v-date-picker(ref='picker', v-model="birthday", @change='save', min='1920-01-01', :max='new Date().toISOString().substr(0, 10)')

              v-select(prepend-icon='location_on', single-line, :items='states', item-text='Name', item-value='Code' v-model='country', label='Country', autocomplete, :rules='pickRules')
              v-text-field(autocomplete='email' prepend-icon='email', name='email', label='E-mail', type='email', :rules="emailRules" required, v-model="email")
              v-text-field#password(autocomplete='new-password' prepend-icon='lock', name='password', label='Password', type='password', :rules='pwdRules', required, v-model="pwd")

              v-card-actions
                v-spacer
                v-btn(v-if="isShow" flat, v-on:click='modifyPwd') {{ modifyText }}
                v-btn(flat, :disabled='!valid' v-on:click='submit') {{ submitText }}
</template>

<script>
import states from '../../../../../public/country'
import axios from 'axios'
export default {
  name: 'Register',
  data: () => ({
    submitText: '',
    titleSubmitText: '',
    resetText: '',
    isShow: false,
    valid: true,
    menu: false,
    firstName: '',
    lastName: '',
    birthday: '',
    country: '',
    pwd: '',
    email: '',
    states: states,
    nameRules: [
      v => !!v || 'Name is required'
    ],
    pickRules: [
      v => !!v || 'Choice is required'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    pwdRules: [
      v => !!v || 'Password is required',
      v => (v && v.length > 5) || 'Password length can be less than 6'
    ]
  }),
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    submit () {
      if (this.$refs.form.validate()) {
        axios.put('/users', {email: this.email, password: this.pwd, first_name: this.firstName, last_name: this.lastName, ctry: this.country, birthday: this.birthday})
          .then(response => {
            console.log(response)
          })
      }
    },
    modifyPwd () {
      return this.$router.push({name: 'ChangePwd'})
    }
  },

  computed: {
    /* Function to retrieve data stored in $store */
    user: function () {
      return this.$store.state.user
    }
  },
  created () {
    if (this.$route.name === 'Register') {
      this.submitText = 'Register'
      this.titleSubmitText = 'Please Register'
    } else if (this.$route.name === 'Account') {
      this.submitText = 'Update'
      this.titleSubmitText = 'Account Settings'
      /* Show only changePassword button when logged */
      this.isShow = true
      this.modifyText = 'Modify Password'
      /* Pass data in $store to the field */
      this.lastName = this.user.lastName
      this.firstName = this.user.firstName
      this.birthday = this.user.birthday
      this.country = this.user.ctry
      this.email = this.user.email
    }
  }
}
</script>

<style scoped>

</style>
