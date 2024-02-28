<route lang="yaml">
meta:
  public: true
</route>

<template>
  <div>
    <h1>Players</h1>
    <ul>
      <Player v-for="player in players" :key="player.id" :player="player" />
    </ul>
  </div>
</template>

<script lang="ts">
import Player from '@/components/Player.vue'
import { Player as PlayerType } from '@/types'
import { createClient } from '@supabase/supabase-js'

let supabase: any = null

export default {
  components: {
    Player,
  },
  data() {
    return {
      players: [] as PlayerType[],
    }
  },
  mounted() {
    const supabaseUrl = 'http://127.0.0.1:54321'
    const supabaseKey =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
    supabase = createClient(supabaseUrl, supabaseKey)
    this.fetchPlayers()
  },
  methods: {
    async fetchPlayers() {
      try {
        let { data: players, error } = await supabase.from('player').select('*')

        if (error) throw error
        console.log('players: ', players)
        this.players = players
      } catch (error) {
        console.error('Error fetching players:', error)
      }
    },
  },
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
