import { createSlice } from '@reduxjs/toolkit'
import { KanbanIssuePrioritiesInterface } from '@/types/kanban/issuePriorities'
import { kanbanIssuePriorities } from '../../../data/issuePriorities'

export interface kanbanPrioritiesState {
  priorities: Array<KanbanIssuePrioritiesInterface>
}

const initialState: kanbanPrioritiesState = {
  priorities: kanbanIssuePriorities,
}

export const kanbanIssuePrioritySlice = createSlice({
  name: 'kanbanIssuePriorities',
  initialState,
  reducers: {},
})

// Action creators are generated for each case reducer function
// export const {  } = counterSlice.actions

export default kanbanIssuePrioritySlice.reducer