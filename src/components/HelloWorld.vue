<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { SharedWidgetState, System } from "dashboard-widget-state";
import { cloudInstance, devServer } from "../config";

const dashboardPath = `${cloudInstance}/dashboard?devServer=${devServer}`;

defineProps<{ msg: string }>();

const isShownAsWidget = window.location !== window.parent.location;
const count = ref(0);
const navigating = ref("");
const systems = ref<System[]>([]);
const sharedState = ref<SharedWidgetState>();

// @ts-ignore
const isEditMode = editMode;

onBeforeMount(
  () =>
    new Promise<void>((resolve) => {
      const stateChecker = setInterval(() => {
        const stateObject = (window as any).sharedState as SharedWidgetState;
        if (stateObject) {
          sharedState.value = stateObject;
          clearInterval(stateChecker);
          stateObject.state$.subscribe((val: number) => {
            count.value = val;
          });
          stateObject.systems$.subscribe((val: System[]) => {
            systems.value = val;
          });
          resolve();
        }
      }, 10);
    })
);
</script>

<template>
  <div v-if="isShownAsWidget">
    <div v-if="navigating">{{ navigating }}</div>
    <div v-else>
      <h1>{{ msg }}</h1>
      <h2 v-if="isEditMode">Edit Mode</h2>
      <h2 v-else>Widget Mode</h2>
      <button type="button" @click="sharedState?.increment()">Increment</button>
      <button type="button" @click="sharedState?.decrement()">Decrement</button>
      <div>Shared state from cloud portal: {{ count }}</div>
      <h3>Systems from cloud portal</h3>
      <section
        v-for="system in systems"
        :key="system.id"
        @click="
          sharedState?.navigateByUrl(`/systems/${system.id}`);
          navigating = `Navigating to ${system.name} system`;
        "
      >
        {{ system.name }}
      </section>
    </div>
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

section {
  padding: 16px 8px;
  border: 1px solid blue;
  margin-bottom: 8px;
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
