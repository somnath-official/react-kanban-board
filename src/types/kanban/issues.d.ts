import { KanbanUsersInterface } from "./users";

export interface KanbanIssuesInterface {
  id: number,
  title: string,
  type_id: number,
  issue_slug: string,
  priority_id: number,
  assignee: KanbanUsersInterface,
  kanban_column_id: number,
  project_id: number,
}