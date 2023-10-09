import { configureStore } from '@reduxjs/toolkit'
import KanbanColumnSlice from './kanban/columns/kanbanColumnSlice'
import kanbanIssuesSlice from './kanban/issues/kanbanIssuesSlice'
import kanbanIssuePrioritySlice from './kanban/issuePriorities/kanbanIssuePrioritiesSlice'
import kanbanIssueTypeSlice from './kanban/issueTypes/kanbanIssueTypeSlice'
import kanbanUserSlice from './kanban/users/kanbanUserSlice'

export const store = configureStore({
  reducer: {
    kanbanColumns: KanbanColumnSlice,
    kanbanIssues: kanbanIssuesSlice,
    kanbanIssuePriorities: kanbanIssuePrioritySlice,
    kanbanIssueTypes: kanbanIssueTypeSlice,
    kanbanUsers: kanbanUserSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch