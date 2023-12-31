import { useEffect, useState } from 'react'
import './kanban_issues.css'
import { KanbanIssuesInterface } from '@/types/kanban/issues'
import { KanbanIssueTypesInterface } from '@/types/kanban/issueTypes'
import { KanbanIssuePrioritiesInterface } from '@/types/kanban/issuePriorities'
import { KanbanUsersInterface } from '@/types/kanban/users'

import { useSelector } from 'react-redux'
import { RootState } from '@/store'

interface KanbanIssueComponentPropType {
  issue: KanbanIssuesInterface
}

const KanbanIssue = (props: KanbanIssueComponentPropType) => {
  const kanbanIssuePriorities = useSelector((state: RootState) => state.kanbanIssuePriorities.priorities)
  const kanbanAvailableIssuesType = useSelector((state: RootState) => state.kanbanIssueTypes.types)
  const kanbanAllUsers = useSelector((state: RootState) => state.kanbanUsers.users)
  const defaultUser = useSelector((state: RootState) => state.kanbanUsers.defaultUser)

  const [issue, setIssue] = useState<KanbanIssuesInterface | null>(null)
  const [issueType, setIssueType] = useState<KanbanIssueTypesInterface>()
  const [priority, setPriority] = useState<KanbanIssuePrioritiesInterface>()
  const [issueAssigne, setIssueAssigne] = useState<KanbanUsersInterface>()

  useEffect(() => {
    const type = kanbanAvailableIssuesType.find(type => type.id === props.issue?.type_id)
    const priority = kanbanIssuePriorities.find(p => p.id === props.issue?.priority_id)
    const assignee = kanbanAllUsers.find(u => u.id === props.issue?.assignee_id)

    setIssue(props.issue)
    setIssueType(type)
    setPriority(priority)
    setIssueAssigne(assignee ?? defaultUser)
  }, [
    props.issue,
    kanbanIssuePriorities,
    kanbanAvailableIssuesType,
    kanbanAllUsers,
    defaultUser,
  ])

  function dragStart(event: React.DragEvent<HTMLDivElement>) {
    const data = {
      issue_id: event.currentTarget.dataset.issue_id,
      start_column_id: event.currentTarget.dataset.start_column_id,
    }
    event.dataTransfer.setData("text/plain", JSON.stringify(data))
    event.dataTransfer.effectAllowed = 'copyMove'
    event.dataTransfer.dropEffect = 'move'
  }

  function onDrag(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    event.currentTarget.classList.add('dragging')
  }

  function dragEnd(event: React.DragEvent<HTMLDivElement>) {
    event.currentTarget.classList.remove('dragging')
  }

  return (
    <div
      className='kanban-issue'
      draggable
      onDragStart={dragStart}
      onDrag={onDrag}
      onDragEnd={dragEnd}
      data-issue_id={issue?.id}
      data-start_column_id={issue?.kanban_column_id}
    >
      <p className='issue-title'>{issue?.title}</p>
      <div className='issue-meta'>
        <div className='meta-left'>
          <div className='issue-type'>
            <img className='icon' src={issueType?.icon} alt={issueType?.title} draggable="false" />
          </div>
          <div className='issue-id' draggable="false">{issue?.issue_slug}</div>
        </div>
        <div className='meta-right'>
          <div className='issue-priority'>
            <img className='icon' src={priority?.icon} alt={priority?.title} draggable="false" />
          </div>
          <div className='issue-assignee'>
            <img className='user-avatar' src={issueAssigne?.avatar} alt={issueAssigne?.name} draggable="false" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default KanbanIssue