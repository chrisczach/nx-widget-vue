<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { SharedWidgetState } from 'nx-dashboard-state'


const cloudInstance = 'https://localhost:9000'
const localHost = 'http://localhost:3000'
const dashboardPath = `${cloudInstance}/dashboard?devServer=http://localhost:3000`
const authorizePath = `${cloudInstance}/authorize?redirectUrl=${dashboardPath}`

defineProps<{ msg: string }>()

const isShownAsWidget = window.location !== window.parent.location
const count = ref(0)
const sharedState = ref<SharedWidgetState>()

// @ts-ignore
const isEditMode = editMode

onBeforeMount(() => new Promise<void>((resolve) => {
  const stateChecker = setInterval(() => {
    const stateObject = (window as any).sharedState as SharedWidgetState
    if (stateObject) {
      sharedState.value = stateObject;
      clearInterval(stateChecker)
      stateObject.state$.subscribe((val: number) => {
        count.value = val
      })
      resolve()
    }
  }, 10)
}))

</script>

<template>
  <div v-if="isShownAsWidget">
    <h1>{{ msg }}</h1>
    <h2 v-if="isEditMode">Edit Mode</h2>
    <h2 v-else>Widget Mode</h2>
    <button type="button" @click="sharedState?.increment()">Increment</button>
    <button type="button" @click="sharedState?.decrement()">Decrement</button>
    <div>Shared state from cloud portal: {{ count }}</div>
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
