<template>
  <header style="background-color: gray; height: 70px; display: flex; align-items: center; justify-content: space-between; padding: 10px 40px">
    <router-link to="/"><button type="button" class="btn btn-dark">Home</button></router-link>
    <router-link to="/MyAdminPanel" v-if="count === true"><button type="button" class="btn btn-dark">admin panel</button></router-link>
    <router-link to="/login" v-else><button type="button" class="btn btn-dark">Login</button></router-link>
  </header>
</template>

<script>
import axios from "axios";

export default {
  name: "myHeader",
  data(){
    return{
      count: false,
    }
  },
  mounted() {
    axios.post('http://localhost:5000/post/access', {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      console.log(res.status)
      if(res.status === 200){
        localStorage.setItem('login', 'true')
      }else{
        localStorage.setItem('login', 'false')
      }
    })
    .catch(e => {
      console.log(e)
      localStorage.setItem('login', 'false')
    })
  },
  created() {
    setInterval(() => {
      this.count = localStorage.getItem('login') === 'true' ? true : false
    }, 1000)
  }
}
</script>

<style scoped>

</style>