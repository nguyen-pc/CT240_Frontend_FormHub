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

export interface StateQuestion {
  question: QuestionPull
  questions: QuestionPull[]
  accessToken: string
  authReady: boolean
}

export const useQuestionStoreAPI = defineStore('question', {
  state: (): StateQuestion => {
    return {
      question: {} as QuestionPull,
      questions: {} as QuestionPull[],
      accessToken: '' as string,
      authReady: false as boolean
    }
  },
  getters: {
    allQuestions: (state: StateQuestion) => state.questions,
    question: (state: StateQuestion) => state.question,
    isAuthenticated: (state: StateQuestion) => (state.accessToken ? true : false)
  },

  actions: {
    async getAllQuestion(projectId: any, surveyId: any) {
      console.log(projectId, surveyId)
      try {
        const { data } = await useApi().get(`/project/${projectId}/survey/${surveyId}/question/all`)

        this.questions = data
        console.log(data)
      } catch (e: Error | any) {
        throw e.message
      }
    },

    async createQuestion(projectId: any, surveyId: any, payload: any) {
      console.log(payload)
      try {
        const { data } = await useApiPrivate().post(
          `/project/${projectId}/survey/${surveyId}/question`,
          payload
        )
      } catch (e: Error | any) {
        throw e.message
      }
    },
    async deleteQuestion(projectId: any, surveyId: any, questionId: any) {
      try {
        const { data } = await useApiPrivate().delete(
          `/project/${projectId}/survey/${surveyId}/question/${questionId}`
        )
      } catch (e: Error | any) {
        throw e.message
      }
    },
    async getQuestionById(projectId: any, surveyId: any, questionId: any) {
      try {
        const { data } = await useApiPrivate().get(
          `/project/${projectId}/survey/${surveyId}/question/${questionId}`
        )
        return data
      } catch (e: Error | any) {
        throw e.message
      }
    },
    async editQuestionById(projectId: any, surveyId: any, questionId: any, payload: any) {
      try {
        const { data } = await useApiPrivate().put(
          `/project/${projectId}/survey/${surveyId}/question/${questionId}`,
          payload
        )
      } catch (e: Error | any) {
        throw e.message
      }
    },

    async submitAnswers(surveyId: any, payload: any) {
      try {
        const { data } = await useApi().post(`/survey/${surveyId}/response`, payload)
      } catch (e: Error | any) {
        throw e.message
      }
    }
    // setActiveQuestion(id: any) {
    //   this.questions = this.questions.map((q) => ({
    //     ...q,
    //     active: q.questionId === id
    //   }))
    //   this.question = this.questions.find((q) => q.active) || null
    // }
  }
})
