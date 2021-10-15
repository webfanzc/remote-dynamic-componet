<template>
  <div>
    <h3>{{ a }}</h3>
    <p>my name is custom</p>
    <p>i m a custom component</p>
    <button @click="a++">increase a</button>
  </div>
</template>

<script >
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({

})
</script>
<style>
h3 {
  margin-top: 60px;
  color: red;
}
</style>