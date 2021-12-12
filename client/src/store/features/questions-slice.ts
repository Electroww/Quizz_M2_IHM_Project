import { createSlice } from '@reduxjs/toolkit'

interface QuestionsState {
  questionsList: Array<Question>
  round: number
}

const initialState: QuestionsState = {
  questionsList: [],
  round: 0,
}

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    incrementRound: (state) => {
      state.round += 1
    },
    resetRound: (state) => {
      state.round = 0
    },
    setQuestionsList: (state, action) => {
      state.questionsList = action.payload
    },
  },
})

export const { incrementRound, resetRound, setQuestionsList } = questionsSlice.actions
export default questionsSlice.reducer
