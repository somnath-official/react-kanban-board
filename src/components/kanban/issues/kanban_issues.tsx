import { useEffect, useState } from 'react'
import './kanban_issues.css'
import { KanbanIssuesInterface } from '../../../types/kanban/issues'
import { kanbanAvailableIssuesType } from '../../../store/kanban/issueTypes/issueTypes'
import { KanbanIssueTypesInterface } from '../../../types/kanban/issueTypes'
import { kanbanIssuePriorities } from '../../../store/kanban/issuePriorities/issuePriorities'
import { KanbanIssuePrioritiesInterface } from '../../../types/kanban/issuePriorities'

interface KanbanIssueComponentPropType {
  issue: KanbanIssuesInterface
}

const KanbanIssue = (props: KanbanIssueComponentPropType) => {
  const [issue, setIssue] = useState<KanbanIssuesInterface | null>(null)
  const [issueType, setIssueType] = useState<KanbanIssueTypesInterface>()
  const [priority, setPriority] = useState<KanbanIssuePrioritiesInterface>()

  useEffect(() => {
    const type = kanbanAvailableIssuesType.find(type => type.id === props.issue?.type_id)
    const priority = kanbanIssuePriorities.find(p => p.id === props.issue?.priority_id)

    setIssue(props.issue)
    setIssueType(type)
    setPriority(priority)
  }, [props.issue])

  function dragStart(event: React.DragEvent<HTMLDivElement>) {
    const data = event.currentTarget.dataset.info ?? ''
    event.dataTransfer.setData("text/plain", data)
    event.dataTransfer.effectAllowed = 'copyMove'
    event.dataTransfer.dropEffect = 'move'
  }

  return (
    <div className='kanban-issue' draggable onDragStart={dragStart} data-info={issue?.id}>
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
            <img className='user-avatar' src={issue?.assignee.avatar} alt={issue?.assignee.name} draggable="false" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default KanbanIssue