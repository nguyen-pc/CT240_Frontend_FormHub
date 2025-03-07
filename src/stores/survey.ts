import { useApiPrivate } from '@/composable/useApi'
import { defineStore } from 'pinia'

export interface SurveyGet {
  surveyName: String
  description: String
}

export interface SurveyPut {
  surveyId: any
  surveyName: String
  description: String
}

export interface SurveyPull {
  surveyId: any
  surveyName: String
  description: String
  responses: []
  createdAt: Date
  updatedAt: Date
  createdBy: String
  updatedBy: String
}

export interface StateSurvey {
  survey: SurveyPull
  surveys: SurveyPull[]
  accessToken: string
  authReady: boolean
}

export const SurveyStore = defineStore('survey', {
  state: (): StateSurvey => {
    return {
      survey: {} as SurveyPull,
      surveys: {} as SurveyPull[],
      accessToken: '' as string,
      authReady: false as boolean
    }
  },
  getters: {
    allSurvey: (state: StateSurvey) => state.surveys,
    survey: (state: StateSurvey) => state.survey,
    isAuthenticated: (state: StateSurvey) => (state.accessToken ? true : false)
  },

  actions: {
    async getAllSurvey(projectId: any) {
      try {
        const { data } = await useApiPrivate().get(`/project/${projectId}/survey`)
        this.surveys = data

        // console.log(data)
      } catch (e: Error | any) {
        throw e.message
      }
    },

    async getSurveyById(projectId: any, surveyId: any) {
      try {
        const { data } = await useApiPrivate().get(`/project/${projectId}/survey/${surveyId}`)
        this.surveys = data

        console.log(data)
      } catch (e: Error | any) {
        throw e.message
      }
    },

    async createSurvey(projectId: any, payload: SurveyGet) {
      console.log(projectId)
      try {
        const { data } = await useApiPrivate().post(`/project/${projectId}/survey`, payload)
      } catch (e: Error | any) {
        throw e.message
      }
    },

    async updateSurvey(projectId: any, payload: SurveyPut) {
      console.log("update", projectId, payload)
      try {
        const { data } = await useApiPrivate().put(`/project/${projectId}/survey`, payload)
      } catch (e: Error | any) {
        throw e.message
      }
    },

    async deleteSurvey(projectId: any, surveyId: any) {
      try {
        await useApiPrivate().delete(`/project/${projectId}/survey/${surveyId}`)
      } catch (e: Error | any) {
        throw e.message
      }
    }
  }
})
