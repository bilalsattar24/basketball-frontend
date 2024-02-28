<script setup lang="ts">
const props = defineProps<{ title: string; msg?: string }>()
</script>

<template>
  <img
    alt="Vue logo"
    src="https://www.rallybehindyou.com/assets/rally-behind-you-logo.e829becf.svg"
    style="height: 200px; margin-top: 25px"
  />

  <h1>{{ title }}</h1>
  <p>{{ msg }}</p>
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
