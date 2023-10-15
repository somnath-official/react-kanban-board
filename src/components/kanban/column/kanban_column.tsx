import { useEffect, useState } from 'react'
import './kanban_column.css'

import { KanbanColumnInterface } from '@/types/kanban/columns'
import { KanbanIssuesInterface } from '@/types/kanban/issues'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import KanbanIssue from '../issues/kanban_issues'
import { updateIssueColumn } from '../../../store/kanban/issues/kanbanIssuesSlice'

interface KanbanColumnComponentPropType {
  column: KanbanColumnInterface
}

const KanbanColumn = (props: KanbanColumnComponentPropType) => {
  const dispatch = useDispatch()
  const kanbanAllIssues = useSelector((state: RootState) => state.kanbanIssues.issues)

  const [column, setColumn] = useState<KanbanColumnInterface | null>(null)
  const [issues, setIssues] = useState<Array<KanbanIssuesInterface>>([])

  useEffect(() => {
    const t = kanbanAllIssues.filter((item) => item.kanban_column_id === column?.id)
    setColumn(props.column)
    setIssues(t)
  }, [column?.id, kanbanAllIssues, props.column])

  // useEffect(() => {
  //   adjustIssueWrapperHeight()
  // })

  function enableDropping(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    const data: { issue_id: string, start_column_id: string } = JSON.parse(event.dataTransfer.getData('text'))
    dispatch(
      updateIssueColumn(
        {
          start_column_id: Number(data.start_column_id),
          issue_id: Number(data.issue_id),
          end_column_id: Number(event.currentTarget.dataset.column_id),
        }
      )
    )
  }

  // function adjustIssueWrapperHeight() {
  //   const wrapper = document.querySelectorAll('.kanban-issues-wrapper') as NodeListOf<HTMLDivElement>
  //   if (wrapper) {
  //     setTimeout(() => {
  //       let height = 0
  //       wrapper.forEach((ele: HTMLDivElement) => {
  //         if (ele.clientHeight > height) {
  //           height = ele.clientHeight
  //         }
  //       })
  //       if (height) {
  //         document.documentElement.style.setProperty('--kanbanIsueWrapperheight', `${height}px`)
  //       }
  //     }, 0)
  //   }
  // }

  return (
    <div
      className='kanban-issues-column'
      onDragOver={enableDropping}
      onDrop={handleDrop}
      data-column_id={column?.id}
    >
      <div className='kanban-column-title'>{column?.title}</div>
      <div className='kanban-issues-wrapper'>
        {
          issues.map(
            (issue, i) => {
              return (
                <KanbanIssue
                  key={i}
                  issue={issue}
                />
              )
            }
          )
        }
      </div>
    </div>
  )
}

export default KanbanColumn