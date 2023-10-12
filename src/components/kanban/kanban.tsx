import { useEffect, useState } from 'react'
import './kanban.css'
import KanbanIssue from './issues/kanban_issues'

import { KanbanColumnInterface } from '@/types/kanban/columns'
import { KanbanIssuesInterface } from '@/types/kanban/issues'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { updateUssieColumn } from '../../store/kanban/issues/kanbanIssuesSlice'

interface KanbanComponentPropType {
  height?: string
  width?: string
}

const Kanban = (props: KanbanComponentPropType) => {
  const dispatch = useDispatch()

  const kanbanColumns = useSelector((state: RootState) => state.kanbanColumns.columns)
  const kanbanAllIssues = useSelector((state: RootState) => state.kanbanIssues.issues)

  const [columns, setColumns] = useState<Array<KanbanColumnInterface>>([])
  const [allIssues, setAllissues] = useState<Array<KanbanIssuesInterface>>([])
  const [kanbanHeight, setKanbanHeight] = useState<string>()
  const [kanbanWidth, setKanbanWidth] = useState<string>()

  useEffect(() => {
    setColumns(kanbanColumns)
    setAllissues(kanbanAllIssues)
    setKanbanHeight(props.height ? props.height : '100vh')
    setKanbanWidth(props.width ? props.width : '100%')
  }, [
    props.height,
    props.width,
    kanbanColumns,
    kanbanAllIssues,
  ])

  // useEffect(() => {
  //   adjustIssueWrapperHeight()
  // })

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

  function enableDropping(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    const column_id = Number(event.currentTarget.dataset.column_id)
    const issue_id = Number(event.dataTransfer.getData('text'))
    // console.log({ column_id, issue_id })
    dispatch(updateUssieColumn({ column_id, issue_id }))
  }

  return (
    <>
      <div
        className='kanban-board-container'
        style={{ height: kanbanHeight, width: kanbanWidth }}
      >
        <div className='kanban-issues-container'>
          {
            columns.map((column, index) => {
              return (
                <div
                  className='kanban-issues-column'
                  key={index}
                  onDragOver={enableDropping}
                  onDrop={handleDrop}
                  data-column_id={column.id}
                >
                  <div className='kanban-column-title'>{column.title}</div>
                  <div className='kanban-issues-wrapper'>
                    {
                      allIssues.map(
                        (issue, i) => {
                          if (issue.kanban_column_id === column.id)
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
            })
          }
        </div>
      </div>
    </>
  )
}

export default Kanban