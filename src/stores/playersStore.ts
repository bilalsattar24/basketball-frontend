import { defineStore } from 'pinia'
import { createClient } from '@supabase/supabase-js'
import { Player, Team } from '@/types'

export const usePlayersStore = defineStore('players', {
  state: () => ({
    players: [] as Player[],
  }),
  actions: {
    async fetchPlayers() {
      try {
        const supabaseUrl = 'http://127.0.0.1:54321'
        const supabaseKey =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
        const supabase = createClient(supabaseUrl, supabaseKey)

        const { data: players, error } = await supabase.from('player').select('*')
        const { data: teams, error: errorTeams } = await supabase.from('team').select('*')
        if (error || errorTeams) {
          throw error
        }

        const newPlayers = []

        if (players && teams) {
          for (const player of players) {
            const tempPlayer: Player = {
              ...player,
              team: teams?.find((team: Team) => team.id === player.team_id),
            }
            newPlayers.push(tempPlayer)
          }
        }
        console.log('players:', newPlayers)
        this.players.push(...newPlayers)
      } catch (error) {
        console.error('Error fetching players:', error)
      }
    },
  },
})
