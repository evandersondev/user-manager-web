export interface User {
  id: string
  name: string
  email: string
  photoUrl: string
  role: string
}

export interface Online {
  id: string
  userEmail: string
}

export interface State {
  users?: User[]
  user: User
  usersOnline: string[]
}
