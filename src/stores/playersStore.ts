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
        const supabaseUrl = 'https://yeurtxzjsxhnjuzrzgzh.supabase.co'
        const supabaseKey =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlldXJ0eHpqc3hobmp1enJ6Z3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNzM0NTgsImV4cCI6MjAyNDY0OTQ1OH0.9WJpIDuAlFEOf-FLtJ7CS1NX9BEnooZblcopVIj7_jU'
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
