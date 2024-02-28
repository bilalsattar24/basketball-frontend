<route lang="yaml">
meta:
  public: true
</route>

<template>
  <div>
    <h1>Players</h1>
    <table>
      <thead>
        <th>Name</th>
        <th>Team</th>
      </thead>
      <tbody>
        <tr v-for="player in players" :key="player.id">
          <td>{{ player.full_name }}</td>
          <td>{{ player.team.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { usePlayersStore } from '@/stores/playersStore'
import { onMounted } from 'vue'

export default {
  name: 'Players',
  setup() {
    const playersStore = usePlayersStore()
    onMounted(async () => {
      try {
        await playersStore.fetchPlayers()
      } catch (error) {
        console.error('Error fetching teams:', error)
      }
    })
    return {
      players: playersStore.players,
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
