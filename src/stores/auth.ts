import { defineStore } from 'pinia'
import { useApi, useApiPrivate } from '@/composable/useApi'

export interface User {
  id: number
  username: string
  email: string
  //isStaff: false
}

export interface State {
  user: User
  users: User[]
  accessToken: string
  authReady: boolean
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: (): State => {
    return {
      user: {} as User,
      users: [] as User[],
      accessToken: '' as string,
      authReady: false as boolean
    }
  },

  getters: {
    userDetail: (state: State) => state.user,
    allUser: (state: State) => state.users,
    isAuthenticated: (state: State) => (state.accessToken ? true : false)
  },

  actions: {
    async attempt() {
      try {
        await this.refresh()
        await this.getUser()
      } catch (error) {
        return
      }
      return
    },

    async login(payload: LoginData) {
      console.log(payload)
      try {
        const { data } = await useApi().post(`/auth/login`, payload)
        this.accessToken = data.access_token
        await this.getUser()
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async getUser() {
      try {
        const { data } = await useApiPrivate().get(`/auth/account`)
        this.user = data
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async refresh() {
      try {
        const { data } = await useApi().get(`/auth/refresh`)
        this.accessToken = data.access_token
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async logout() {
      try {
        const { data } = await useApiPrivate().post(`/auth/logout`)
        this.accessToken = ''
        this.user = {} as User
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async register(payload: RegisterData) {
      try {
        const { data } = await useApi().post(`/auth/register`, payload)
        
      } catch (e: Error | any) {
        throw e.message
      }
    }
  }
})
