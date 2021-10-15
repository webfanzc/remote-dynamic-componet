<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import HelloWorld from "./components/HelloWorld.vue";
import { ref } from "@vue/reactivity";

let curComponent = ref(HelloWorld);

const loadComponent = async () => {
  const script = document.createElement("script");
  script.src =
    "http://localhost:3089/getRemoteComponent?ts=" + new Date().getTime();
  document.head.appendChild(script);

  script.onload = () => {
    curComponent.value = window.MyPlugin.default;
  };
};
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.svg" />
  <component :is="curComponent"></component>
  <button @click="loadComponent">远程加载组件</button>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img {
  width: 200px;
}
</style>
