import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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
  reducers: {
    updateIssueColumn(
      state,
      action: PayloadAction<{ start_column_id: number, issue_id: number, end_column_id: number }>
    ) {
      if (action.payload.start_column_id !== action.payload.end_column_id) {
        const tempObj: KanbanIssuesInterface = Object.assign({}, state.issues.find(issue => issue.id === action.payload.issue_id))
        state.issues.splice(state.issues.findIndex((issue) => issue.id === action.payload.issue_id), 1)
        tempObj.kanban_column_id = action.payload.end_column_id
        state.issues.push(tempObj)
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateIssueColumn } = kanbanIssuesSlice.actions

export default kanbanIssuesSlice.reducer