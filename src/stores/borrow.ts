import { defineStore } from 'pinia'
import { useApi, useApiPrivate } from '../composable/useApi'

export enum BorrowStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  RETURNED = 'returned',
  REJECTED = 'rejected'
}

export interface Borrow {
  id: string
  user: string
  book: string
  borrowedDay: Date
  estimatedReturnDate: Date
  actualReturnDate: Date | null
  status: BorrowStatus
}

export interface State {
  borrows:  Borrow[]
  accessToken: string
  authReady: boolean
}

export const useBorrowStore = defineStore('borrow', {
  state: (): State => {
    return {
      borrows: [] as Borrow[],
      accessToken: '' as string,
      authReady: false as boolean
    }
  },

  getters: {
    allBorrow: (state: State) => state.borrows,
    isAuthenticated: (state: State) => (state.accessToken ? true : false)
  },

  actions: {
    async getAllBorrows() {
      try {
        const { data } = await useApi().get('/api/borrow/allborrow')
        this.borrows = data
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async updateBorrowStatus(borrowId: string, status: BorrowStatus) {
      const payload: any = { borrowId, status };
      
      // Nếu trạng thái là RETURNED, thêm ngày trả
      if (status === BorrowStatus.RETURNED) {
        payload.actualReturnDate = new Date().toISOString();
      }

      const { data } = await useApiPrivate().put(
        `/api/borrow/status`, 
        payload
      );
      return data;
    },

  }
})
