<template>
  <div class="app">
      <my-header></my-header>
      <router-view @updateArray="updateArray"></router-view>
  </div>
</template>

<script>
import axios from "axios";
import { computed } from 'vue'
import MyHeader from "@/components/myHeader";

export default {
  name: 'App',
  components: {
    MyHeader,
  },
  data(){
    return{
      arrayPost: [],
      limit: 9,
      skip: 0,
    }
  },
  provide() {
    return {
      arrayPost: computed(() => this.arrayPost),
    }
  },
  methods: {
    updateArray(){
      this.skip += 9
      axios.get(`http://localhost:5000/post/?limit=${this.limit}&skip=${this.skip}`)
          .then(response => {
            console.log(response)
            this.arrayPost = [...this.arrayPost, ...response.data]
          })
          .catch(e => {
            console.log(e)
          })
    }
  },
  mounted() {
    axios.get(`http://localhost:5000/post/?limit=${this.limit}&skip=${this.skip}`)
    .then(response => {
      this.arrayPost = response.data
    })
    .catch(e => {
      console.log(e)
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
