import { defineStore } from 'pinia'
import { Team } from '@/types'
import { getSupabaseClient } from '@/supabase/supabase'

export const useTeamsStore = defineStore('teams', {
  state: () => ({
    teams: [] as Team[],
  }),
  actions: {
    async fetchTeams() {
      if (this.teams.length) {
        return
      }
      try {
        const supabaseClient = getSupabaseClient()
        const { data: teams, error } = await supabaseClient.from('team').select('*')
        if (error) {
          throw error
        }
        this.teams.push(...teams)
      } catch (error) {
        console.error('Error fetching teams:', error)
      }
    },
  },
})
