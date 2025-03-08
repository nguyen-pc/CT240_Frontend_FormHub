import { useApi, useApiPrivate } from '@/composable/useApi'
import { defineStore } from 'pinia'

export interface QuestionPush {
  questionId: any
  questionName: String
  questionType: String
  choice: []
}

export interface QuestionPull {
  questionId: any
  questionName: String
  questionType: String
  choices: []
}

export interface StateAnswer {
  question: QuestionPull
  questions: QuestionPull[]
  accessToken: string
  authReady: boolean
}

export const useAnswerStoreAPI = defineStore('answer', {
  state: (): StateAnswer => {
    return {
      question: {} as QuestionPull,
      questions: {} as QuestionPull[],
      accessToken: '' as string,
      authReady: false as boolean
    }
  },
  getters: {
    allQuestions: (state: StateAnswer) => state.questions,
    question: (state: StateAnswer) => state.question,
    isAuthenticated: (state: StateAnswer) => (state.accessToken ? true : false)
  },

  actions: {
    async uploadfile(file: any, surveyId: any) {
      console.log(file, surveyId)
      const formData = new FormData()
      formData.append('file', file)
      try {
        const { data } = await useApi().post(`/files?folder=${surveyId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      } catch (e: Error | any) {
        throw e.message
      }
    },
    async getFile(surveyId: any){
      try{
        const {data} = await useApiPrivate().get(`files/${surveyId}/list`)
        return data
      }catch (e: Error | any) {
        throw e.message
      }
    },
    async downloadFile(folder: any, fileName: any){
      try{
        const {data} = await useApiPrivate().get(`/files?folder=${folder}&fileName=${fileName}`)
        return data
      } catch (e: Error | any) {
        throw e.message
      }
    },
    async deleteFile(folder: any, fileName: any){
      try{
        const {data} = await useApiPrivate().delete(`/files?folder=${folder}&fileName=${fileName}`)
        
      } catch (e: Error | any) {
        throw e.message
      }
    }

  }
})
