<template>
  <div class="card mb-3" style="width: 80%; margin: 35px auto">
    <h5 class="card-title">{{item.title}}</h5>
    <img :src="item.image" class="card-img-top" alt="картинки нету" style="height: 20rem; width: 100%">
    <div class="card-body">
      <p class="card-text">{{ item.text }}</p>
      <p class="card-text"><small class="text-muted">Создано {{item.date}}</small></p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "postPage",
  data(){
    return {
      item: {},
    }
  },
  created() {
    axios.get(`http://localhost:5000/post/?_id=${this.$route.params._id}`)
    .then(response => {
      this.item = response.data;
      this.item.image = "http://localhost:5000/" + this.item.image
    })
    .catch(e => {
      console.log(e)
    })
  }
}
</script>

<style scoped>

</style>