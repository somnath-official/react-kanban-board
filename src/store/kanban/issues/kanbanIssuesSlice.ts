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
    updateUssieColumn(state, action: PayloadAction<{ column_id: number, issue_id: number }>) {
      state.issues.map((issue) => {
        if (issue.id === action.payload.issue_id) {
          issue.kanban_column_id = action.payload.column_id
        }
      })
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateUssieColumn } = kanbanIssuesSlice.actions

export default kanbanIssuesSlice.reducer