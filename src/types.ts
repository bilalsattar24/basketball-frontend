export type Team = {
  id: number
  name: string
  city: string
}

export type Player = {
  id: number
  full_name: string
  team: Team
  team_id: number
}
