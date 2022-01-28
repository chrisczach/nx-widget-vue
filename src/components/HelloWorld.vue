<script setup lang="ts">
import { ref } from 'vue'


const cloudInstance = 'https://localhost:9000'
const localHost = 'http://localhost:3000'
const dashboardPath = `${cloudInstance}/dashboard?devServer=http://localhost:3000`
const authorizePath = `${cloudInstance}/authorize?redirectUrl=${dashboardPath}`

defineProps<{ msg: string }>()

const isShownAsWidget = window.location !== window.parent.location
const count = ref(0)
// @ts-ignore
const isEditMode = editMode

</script>

<template>
  <div v-if="isShownAsWidget">
    <h1>{{ msg }}</h1>
    <h2 v-if="isEditMode">Edit Mode</h2>
    <h2 v-else>Widget Mode</h2>
    <button type="button" @click="count++">count is: {{ count }}</button>
  </div>
  <div v-else>
    <h1 v-if="isEditMode">Edit Mode running</h1>
    <h1 v-else>Widget running</h1>
    <a :href="dashboardPath" target="_widget_preview">Open Live Preview</a>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
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
