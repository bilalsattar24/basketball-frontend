<template>
  <div class="team">
    <h2>{{ team.name }}</h2>
  </div>
</template>

<script lang="ts">
import { Team } from '@/types'
import { PropType } from 'vue'

export default {
  name: 'Team',
  props: {
    team: {
      type: Object as PropType<Team>,
      required: true,
    },
  },
}
</script>
