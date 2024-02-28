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
    <p v-else class="loading-message">Loading teams...</p>
  </div>
</template>

<script lang="ts">
import { useTeamsStore } from '@/stores/teamsStore'
import { onMounted } from 'vue'

export default {
  name: 'Teams',
  setup() {
    const teamsStore = useTeamsStore()
    onMounted(() => {
      teamsStore.fetchTeams()
    })
    return {
      teams: teamsStore.teams, // Access teams from the store
    }
  },
}
</script>

<style scoped>
table {
  margin-left: auto;
  margin-right: auto;
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
