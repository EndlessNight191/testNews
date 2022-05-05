<template>
  <div style=" width: 600px; height: 350px; margin: 10px 50px; display: flex; border: 3px solid gray; border-radius: 15px">
    <img :src="link" alt="Пост без картинки" style="width: 50%; height: 100%; border-bottom-left-radius: 10px; border-top-left-radius: 10px">
    <div style="width: 50%; display: flex; flex-direction: column; justify-content: space-between">
      <div class="text" style="margin-top: 20px">{{item.title}}</div>
      <div class="text">{{item.text}}</div>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <div style="padding: 10px">{{item.date}}</div>
        <button style="margin: 10px" type="button" class="btn btn-dark" @click="$router.push(`/posts/${item._id}`)">Открыть</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myCard",
  props: {
    item: {
      title: String,
      text: String,
      date: String,
      image: String,
      require: true
    }
  },
  data(){
    return{
      link: "http://localhost:5000/" + this.item.image,
    }
  },
}
</script>

<style scoped>

.text{
  word-wrap: break-word;
  position: relative;
  height: 50px;
  overflow: hidden;
}

</style>