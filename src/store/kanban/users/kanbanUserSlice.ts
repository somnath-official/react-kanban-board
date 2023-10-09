import { createSlice } from '@reduxjs/toolkit'
import { KanbanUsersInterface } from '@/types/kanban/users'
import { kanbanAllUsers, defaultUser } from '../../../data/allUsers'

export interface kanbanUserState {
  users: Array<KanbanUsersInterface>
  defaultUser: KanbanUsersInterface
}

const initialState: kanbanUserState = {
  users: kanbanAllUsers,
  defaultUser
}

export const kanbanUserSlice = createSlice({
  name: 'kanbanUser',
  initialState,
  reducers: {},
})

// Action creators are generated for each case reducer function
// export const {  } = kanbanUserSlice.actions

export default kanbanUserSlice.reducer