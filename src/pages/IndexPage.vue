<template>
  <q-page>
    <div class="row">
      <q-table
      title="Users"
      :rows="users"
      :columns="columns"
      row-key="name"
      class="col"
      >
        <template v-slot:body-cell-name="user_rows">
          <q-td :props="user_rows">
            <div>
              <q-btn flat :label="user_rows.value" @click="onSelectUser(user_rows.row)"></q-btn>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
    <div class="q-pa-md" style="max-width: 400px">
      <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="formname"
        label="Your name *"
      />

      <q-input
        filled
        type="email"
        v-model="formemail"
        label="Your email *"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
    </div>
  </q-page>
</template>

<script setup>
import axios from 'axios'

defineOptions({
  name: 'IndexPage',
  data () {
    return {
      columns: [
        { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true }
      ],
      users: [],
      formname: '',
      formemail: ''
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    getUsers () {
      axios.get('https://localhost:5001/api/Users')
        .then((res) => {
          this.users = res.data
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onSubmit () {
      axios.post('https://localhost:5001/api/Users',
        {
          name: this.formname,
          email: this.formemail
        })
        .then((res) => {
          this.getUsers()
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onReset () {
      this.formname = null
      this.formemail = null
    },
    onSelectUser (row) {
      console.log(row.name)
      this.$router.push({
        path: 'userdetails/',
        query:
          {
            id: row.id,
            name: row.name,
            email: row.email
          }
      })
    }
  }
})
</script>
