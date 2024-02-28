<route lang="yaml">
meta:
  public: true
</route>

<template>
  <div>
    <h1>Basketball Teams</h1>
    <table v-if="teams.length">
      <thead>
        <th>Name</th>
        <th>City</th>
      </thead>
      <tbody>
        <tr v-for="team in teams" :key="team.id">
          <td>{{ team.name }}</td>
          <td>{{ team.city }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>Loading teams...</p>
  </div>
</template>

<script lang="ts">
import { useTeamsStore } from '@/stores/teamsStore'
import { onMounted } from 'vue'

export default {
  name: 'Teams',
  setup() {
    const teamsStore = useTeamsStore()
    onMounted(async () => {
      try {
        await teamsStore.fetchTeams()
      } catch (error) {
        console.error('Error fetching teams:', error)
      }
    })
    return {
      teams: teamsStore.teams,
    }
  },
}
</script>

<style scoped>
h1 {
  margin-top: 20px;
}
table {
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  width: 80%;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
