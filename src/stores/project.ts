import { useApi, useApiPrivate } from '@/composable/useApi'
import { defineStore } from 'pinia'

export interface ProjectGet {
  projectName: String
  description: String
}

export interface ProjectPull {
  projectId: any
  projectName: String
  description: String
  surveys: []
  createdAt: Date
  createdBy: String
  updatedAt: Date
  updatedBy: String
}

export interface StateProject {
  project: ProjectPull
  projects: ProjectPull[]
  accessToken: string
  authReady: boolean
}

export const ProjectStore = defineStore('project', {
  state: (): StateProject => {
    return {
      project: {} as ProjectPull,
      projects: {} as ProjectPull[],
      accessToken: '' as string,
      authReady: false as boolean
    }
  },
  getters: {
    allProject: (state: StateProject) => state.projects,
    project: (state: StateProject) => state.project,
    isAuthenticated: (state: StateProject) => (state.accessToken ? true : false)
  },

  actions: {
    async getAllProjects() {
      try {
        const { data } = await useApiPrivate().get('/project')
        this.projects = data

        console.log(data)
      } catch (e: Error | any) {
        throw e.message
      }
    },

    async createProject(payload: ProjectGet) {
      console.log(payload)
      try {
        const { data } = await useApiPrivate().post(`/project`, payload)
      } catch (e: Error | any) {
        throw e.message
      }
    }
  }
})
