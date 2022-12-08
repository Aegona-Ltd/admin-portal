export interface UserLogin {
  userName: string
  token: string
  expiresIn: number
  completePercentage: number
}

export interface User {
  id: string
  email: string
  isActive: boolean
  isSuperAdmin: boolean
  profile: Profile

  [key: string]: any
}

export interface Profile {
  code: string
  email: string
  fullName: string
  avatarLink?: string | null
  profileType: string
}

export interface UserCreate {
  email: string
  password: string
  fullName: string
  groupId: string
  profileType: number
  isActive: boolean

  isAuthenticationWithLdap?: boolean
  nationalId?: number
  gender?: number
  dob?: string
}
