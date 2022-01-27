<script setup lang="ts">
import { ref } from 'vue'


const cloudInstance = 'https://cloud-test.hdw.mx'
const localHost = 'http://localhost:3000'
const dashboardPath = `${cloudInstance}/dashboard?devServer=http://localhost:3000/widget`
const authorizePath = `${cloudInstance}/authorize?redirectUrl=${dashboardPath}`

defineProps<{ msg: string }>()

const isIframe = window.location !== window.parent.location
const count = ref(0)

</script>

<template>
  <div v-if="isIframe">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>{{ msg }}</h1>
    <button type="button" @click="count++">count is: {{ count }}</button>
  </div>
  <div v-else>
    <h1>Widget running</h1>
    <a :href="dashboardPath" target="_widget_preview">Open Live Preview</a>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

div {
  margin: 64px 0;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
