import { createSlice } from '@reduxjs/toolkit'
import { KanbanColumnInterface } from '../../../types/kanban/columns'
import { kanbanColumns } from '../../../data/kanbanColumns'

export interface kanbanColumnsState {
  columns: Array<KanbanColumnInterface>
}

const initialState: kanbanColumnsState = {
  columns: kanbanColumns,
}

export const kanbanColumnsSlice = createSlice({
  name: 'kanbanColumns',
  initialState,
  reducers: {},
})

// Action creators are generated for each case reducer function
// export const {  } = kanbanColumnsSlice.actions

export default kanbanColumnsSlice.reducer