<template>

  <div v-if="model" style="height: 50%; width: 60%; background-color: white; border: 2px black solid; position: absolute; z-index: 1000; margin-left: 20%; margin-top: 10%; border-radius: 15px; padding: 30px">
    <div>
        <h5 class="title">Вы успешно зарегестрировались</h5>
    </div>
    <div>
        <p style="color: black">Ваш Логин: {{this.user.username}}</p>
        <p>Ваш Пароль: {{this.user.password}}</p>
    </div>
    <div style="display: flex; flex-direction: column">
        <button @click="next" type="button" class="btn btn-secondary">Далее, в админ панель</button>
        <button @click="model = !model" type="button" class="btn btn-secondary" style="margin-top: 10px">Закрыть и остатсья тут</button>
    </div>
  </div>

  <form class="row g-3 needs-validation" style="display: flex; flex-direction: column; width: 40%; margin: 200px auto;" @submit.prevent="onSubmit" data-bs-toggle="tooltip" data-bs-placement="top" title="Введите свой логин">
    <div class="col-md-12 position-relative">
      <label for="validationTooltip01" class="form-label" >Name</label>
      <input type="text" class="form-control" id="validationTooltip01" v-model="user.username" required>
      <div class="valid-tooltip">
        Looks good!
      </div>
    </div>
    <div class="col-md-12 position-relative">
      <label for="validationTooltip02" class="form-label">Password</label>
      <input type="password" class="form-control" id="validationTooltip02" v-model="user.password" required data-bs-toggle="tooltip" data-bs-placement="top" title="Введите свой пароль">
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
      model: false,
      user:{
        username: '',
        password: '',
      }
    }
  },
  methods: {
    next(){
      this.model = false
      this.$router.push('/MyAdminPanel')
    },
    onSubmit() {
      axios.post(`http://localhost:5000/auth/adminLogin`,{
        username: this.user.username,
        password: this.user.password,
      })
      .then(response => {
        console.log(response.data)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('login', 'true')
        this.model = true
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
