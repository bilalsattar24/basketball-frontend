<route lang="yaml">
meta:
  public: true
</route>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from '@/components/HelloWorld.vue'
import { useAuth } from '@/auth'
import { useI18n } from 'vue-i18n'

// Composition API example
let auth = useAuth()
const { t, locale, availableLocales } = useI18n()
</script>

<template>
  <HelloWorld title="Basketball Coding Challenge" />

  <p>Click on the links to See Players or Teams</p>
  <router-link :to="{ name: 'players' }">Players</router-link>
  <br />
  <router-link :to="{ name: 'teams' }">Teams</router-link>
</template>
