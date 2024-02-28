import { defineStore } from 'pinia'
import { createClient } from '@supabase/supabase-js'
import { Team } from '@/types'

export const useTeamsStore = defineStore('teams', {
  state: () => ({
    teams: [] as Team[],
  }),
  actions: {
    async fetchTeams() {
      try {
        const supabaseUrl = 'http://127.0.0.1:54321'
        const supabaseKey =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
        const supabase = createClient(supabaseUrl, supabaseKey)

        const { data: teams, error } = await supabase.from('team').select('*')
        console.log('teams:', teams)
        if (error) throw error
        this.teams.push(...teams)
      } catch (error) {
        console.error('Error fetching teams:', error)
      }
    },
  },
})
