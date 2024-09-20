<template>
    <q-page>
        <div class="q-pa-md" style="max-width: 400px">
        <q-form
        @submit="onSubmit"
        @reset="openUserList"
        class="q-gutter-md"
        >
        <q-input
            v-model="formid"
            hidden
        />
        <q-input
            filled
            v-model="formname"
            label="Name"
        />
        <q-input
            filled
            type="email"
            v-model="formemail"
            label="Email"
        />
        <div>
            <q-btn label="Save Changes" type="submit" color="primary"/>
            <q-btn label="Go Back" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
        </q-form>
        </div>
    </q-page>
</template>

<script setup>
import axios from 'axios'

defineOptions({
  name: 'UserDetails',
  data () {
    return {
      formname: '',
      formemail: ''
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    onSubmit () {
      axios.put('https://localhost:5001/api/Users',
        {
          id: this.formid,
          name: this.formname,
          email: this.formemail
        })
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getUser () {
      const userId = this.$route.query.id
      axios.get('https://localhost:5001/api/Users/' + userId)
        .then((res) => {
          this.formname = res.data.name
          this.formemail = res.data.email
          this.formid = res.data.id
        })
        .catch((err) => {
          console.log(err)
        })
    },
    openUserList () {
      this.$router.push({
        path: '/'
      })
    }
  }
})
</script>
