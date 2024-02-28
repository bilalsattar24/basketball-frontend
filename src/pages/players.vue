<route lang="yaml">
meta:
  public: true
</route>

<template>
  <div>
    <h1>Players</h1>
    <div v-if="isEditing">
      Edit Player
      <form @submit.prevent="updatePlayerName">
        <input type="text" :placeholder="editingPlayerName" />
        <button type="submit">Save</button>
      </form>
      <button @click="isEditing = false">Cancel</button>
    </div>
    <table>
      <thead>
        <th>Name (Click row to edit player name)</th>
        <th>Team</th>
      </thead>
      <tbody>
        <tr v-for="player in players" :key="player.id" @click="setEditingMode(player)">
          <td>{{ player.full_name }}</td>
          <td>{{ player.team.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { usePlayersStore } from '@/stores/playersStore'
import { Player } from '@/types'
import { onMounted } from 'vue'

export default {
  name: 'Players',
  data() {
    return {
      isEditing: false,
      editingPlayerName: '',
    }
  },
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
  methods: {
    setEditingMode(player: Player) {
      this.isEditing = true
      this.editingPlayerName = player.full_name
    },
    async updatePlayerName(event: Event) {
      const inputElement = (event.target as HTMLFormElement | null)?.querySelector('input') as HTMLInputElement | null
      const newValue = inputElement?.value ?? ''
      const playerToUpdate = this.players.find((p) => p.full_name === this.editingPlayerName)
      if (playerToUpdate) {
        try {
          const playersStore = usePlayersStore()
          await playersStore.updatePlayerName(playerToUpdate.id, newValue)
          this.isEditing = false
          this.editingPlayerName = ''
        } catch (error) {
          console.error('Error saving name:', error)
        }
      }
    },
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
