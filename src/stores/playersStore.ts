import { defineStore } from 'pinia'
import { Player, Team } from '@/types'
import { getSupabaseClient } from '@/supabase/supabase'

export const usePlayersStore = defineStore('players', {
  state: () => ({
    players: [] as Player[],
  }),
  actions: {
    async fetchPlayers() {
      try {
        const supabaseClient = getSupabaseClient()

        const { data: players, error } = await supabaseClient.from('player').select('*')
        const { data: teams, error: errorTeams } = await supabaseClient.from('team').select('*')
        if (error || errorTeams) {
          throw error
        }

        const updatedPlayers = []

        if (players && teams) {
          for (const player of players) {
            const tempPlayer: Player = {
              ...player,
              team: teams?.find((team: Team) => team.id === player.team_id),
            }
            updatedPlayers.push(tempPlayer)
          }
        }
        this.players.push(...updatedPlayers)
      } catch (error) {
        console.error('Error fetching players:', error)
      }
    },
  },
})
