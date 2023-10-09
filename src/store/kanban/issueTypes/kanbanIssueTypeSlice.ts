import { createSlice } from '@reduxjs/toolkit'
import { KanbanIssueTypesInterface } from '@/types/kanban/issueTypes'
import { kanbanAvailableIssuesType } from '../../../data/issueTypes'

export interface kanbanTypesState {
  types: Array<KanbanIssueTypesInterface>
}

const initialState: kanbanTypesState = {
  types: kanbanAvailableIssuesType,
}

export const kanbanIssueTypeSlice = createSlice({
  name: 'kanbanIssueTypes',
  initialState,
  reducers: {},
})

// Action creators are generated for each case reducer function
// export const {  } = counterSlice.actions

export default kanbanIssueTypeSlice.reducer