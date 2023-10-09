import { createSlice } from '@reduxjs/toolkit'
import { KanbanIssuesInterface } from '../../../types/kanban/issues'
import { kanbanAllIssues } from '../../../data/issues'

export interface kanbanIssuesState {
  issues: Array<KanbanIssuesInterface>
}

const initialState: kanbanIssuesState = {
  issues: kanbanAllIssues,
}

export const kanbanIssuesSlice = createSlice({
  name: 'kanbanIssues',
  initialState,
  reducers: {},
})

// Action creators are generated for each case reducer function
// export const {  } = counterSlice.actions

export default kanbanIssuesSlice.reducer