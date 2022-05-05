<template>
  <div style="margin: 0 auto; width: 80%">
    <form class="was-validated" @submit.prevent="onSubmit">

      <div class="col-md-12 position-relative">
        <label for="validationTooltip01" class="form-label">Header</label>
        <input type="text" class="form-control" id="validationTooltip01" placeholder="Заголовок поста" v-model="post.title" required>
      </div>

      <div class="col-md-12 position-relative">
        <label for="validationTextarea" class="form-label">Textarea</label>
        <textarea class="form-control is-invalid" id="validationTextarea" placeholder="Required example textarea" v-model="post.text" required></textarea>
      </div>

      <div class="form-file mb-3">
        <input type="file" class="form-file-input" id="validationFormFile" ref="file" accept="image/jpg">
        <label class="form-file-label" for="validationFormFile">
          <span class="form-file-text">Choose file...</span>
          <span class="form-file-button">Browse</span>
        </label>
        <div class="invalid-feedback">Example invalid form file feedback</div>
      </div>

      <div class="mb-3">
        <button class="btn btn-primary" type="submit" value="Submit">Submit form</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MyAdminPanel",
  data(){
    return{
      post: {
        title: '',
        text: '',
        image: '',
      }
    }
  },
  methods: {
    onSubmit() {
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
      this.post.image = this.$refs.file.files[0];
      axios.post('http://localhost:5000/post/create',{
        title: this.post.title,
        text: this.post.text,
        picture: this.post.image,
      }, {headers: headers})
          .then(response => {
            alert(response.data.message)
            console.log(response.data)
          })
          .catch(e => {
            console.log(e)
            alert(e.response.data.message)
          })
    },
  }
}
</script>

<style scoped>

</style>