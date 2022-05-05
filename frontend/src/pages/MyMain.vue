<template>
    <div style="margin: 0 auto; display: flex; flex-wrap: wrap">
      <my-card v-for="item in array" :item="item" :key="item._id"></my-card>
    </div>
  <button @click="$emit('updateArray')" type="button" class="btn btn-primary btn-lg btn-block">Подгрузить еще</button>
</template>

<script>
import MyCard from "@/components/myCard";

export default {
  name: "MyMain",
  components: {
    MyCard,
  },
  data() {
    return {
      array: this.arrayPost
    }
  },
  inject: ['arrayPost'],
}
</script>

<style scoped>

</style>