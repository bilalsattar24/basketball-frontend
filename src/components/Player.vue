<template>
  <div class="player">
    <h2>{{ player.full_name }}</h2>
    <p>Team: {{ player.team }}</p>
  </div>
</template>

<script lang="ts">
import { Player } from '@/types'
import { PropType } from 'vue'

export default {
  name: 'Player',
  props: {
    player: {
      type: Object as PropType<Player>,
      required: true,
    },
  },
}
</script>

<style scoped>
.player {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
