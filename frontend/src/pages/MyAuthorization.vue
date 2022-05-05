<template>
  <form class="row g-3 needs-validation" style="display: flex; flex-direction: column; width: 40%; margin: 200px auto;" @submit.prevent="onSubmit">
    <div class="col-md-12 position-relative">
      <label for="validationTooltip01" class="form-label" >Name</label>
      <input type="text" class="form-control" id="validationTooltip01" v-model="user.username" required>
      <div class="valid-tooltip">
        Looks good!
      </div>
    </div>
    <div class="col-md-12 position-relative">
      <label for="validationTooltip02" class="form-label">Password</label>
      <input type="text" class="form-control" id="validationTooltip02" v-model="user.password" required>
      <div class="valid-tooltip">
        Looks good!
      </div>
    </div>
    <button class="btn btn-primary col-md-12" type="submit" value="Submit">Log in</button>
    </form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data(){
    return{
      user:{
        username: '',
        password: '',
      }
    }
  },
  methods: {
    onSubmit() {
      axios.post(`http://localhost:5000/auth/adminLogin`,{
        username: this.user.username,
        password: this.user.password,
      })
      .then(response => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('login', 'true')
        this.$router.push('/MyAdminPanel')
      })
      .catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style scoped>

</style>
