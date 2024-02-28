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
        const supabaseUrl = 'https://yeurtxzjsxhnjuzrzgzh.supabase.co'
        const supabaseKey =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlldXJ0eHpqc3hobmp1enJ6Z3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNzM0NTgsImV4cCI6MjAyNDY0OTQ1OH0.9WJpIDuAlFEOf-FLtJ7CS1NX9BEnooZblcopVIj7_jU'
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
