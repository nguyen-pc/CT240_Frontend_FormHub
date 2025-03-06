import { useApi, useApiPrivate } from '@/composable/useApi'
import { defineStore } from 'pinia'

export interface ProjectGet {
  projectName: String
  description: String
}

export interface ProjectPut {
  projectId: any
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
      project: {
        projectId: null,
        projectName: '',
        description: '',
        surveys: [],
        createdAt: new Date(),
        createdBy: '',
        updatedAt: new Date(),
        updatedBy: ''
      } as ProjectPull,
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

    async getProjectsById(projectId: any) {
      try {
        console.log('Id project', projectId)
        const { data } = await useApiPrivate().get(`/project/${projectId}`)
        console.log('Dữ liệu API trả về:', data)
        if (data) {
          Object.assign(this.project, data) // ✅ Cập nhật từng thuộc tính mà không làm mất phản ứng của Vue
        }
        console.log('Đã cập nhật project:', this.project)
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
    },

    async updateProject(payload: ProjectPut) {
      console.log('update', payload)
      try {
        const { data } = await useApiPrivate().put(`/project`, payload)
      } catch (e: Error | any) {
        throw e.message
      }
    },

    async deleteProject(projectId: any) {
      try {
        await useApiPrivate().delete(`/project/${projectId}`)
      } catch (e: Error | any) {
        throw e.message
      }
    }
  }
})
