export interface User {
  id: string
  name: string
  email: string
  photoUrl: string
  role: string
}

export interface Online {
  id: string
  email: string
  status: 'online' | 'absent'
}

export interface State {
  users?: User[]
  user: User
  usersOnline: Online[]
}
