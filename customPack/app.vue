<template>
  <div>
    <h3>{{ a }}</h3>
    <p>my name is custom</p>
    <p>i m a custom component</p>
    <button @click="a++">increase a</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

let a = ref(3)
let b = 'orange'
</script>

<style scoped>
h3 {
  margin-top: 60px;
  color: red;
  color: v-bind(b);
}
</style>