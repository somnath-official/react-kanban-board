import { useEffect, useState } from 'react'
import './kanban.css'
import KanbanIssue from './issues/kanban_issues'

import { kanbanColumns } from '../../store/kanban/columns/kanbanColumns'
import { KanbanColumnInterface } from '../../types/kanban/columns'
import { kanbanAllIssues } from '../../store/kanban/issues/issues'
import { KanbanIssuesInterface } from '../../types/kanban/issues'

const Kanban = () => {
  const [columns, setColumns] = useState<Array<KanbanColumnInterface>>([])
  const [allIssues, setAllissues] = useState<Array<KanbanIssuesInterface>>([])

  useEffect(() => {
    setColumns(kanbanColumns)
    setAllissues(kanbanAllIssues)
  }, [])

  return (
    <>
      <div className='kanban-board-container'>
        <div className='kanban-issues-container'>
          {
            columns.map((column, index) => {
              return (
                <div className='kanban-issues-column' key={index}>
                  <span className='kanban-column-title'>{column.title}</span>
                  {
                    allIssues.map(
                      (issue) => {
                        if (issue.kanban_column_id === column.id)
                          return <KanbanIssue issue={issue} />
                      }
                    )
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Kanban