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

export const useQuestionStore = defineStore('question', {
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
        const { data } = await useApiPrivate().get(
          `/project/${projectId}/survey/${surveyId}/question/all`
        )
        this.questions = data
        console.log(data)
      } catch (e: Error | any) {
        throw e.message
      }
    }
  }
})
