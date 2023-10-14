import { useEffect, useState } from 'react'
import './kanban.css'

import { KanbanColumnInterface } from '@/types/kanban/columns'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import KanbanColumn from './column/kanban_column'

interface KanbanComponentPropType {
  height?: string
  width?: string
}

const Kanban = (props: KanbanComponentPropType) => {

  const kanbanColumns = useSelector((state: RootState) => state.kanbanColumns.columns)

  const [columns, setColumns] = useState<Array<KanbanColumnInterface>>([])
  const [kanbanHeight, setKanbanHeight] = useState<string>()
  const [kanbanWidth, setKanbanWidth] = useState<string>()

  useEffect(() => {
    setColumns(kanbanColumns)
    setKanbanHeight(props.height ? props.height : '100vh')
    setKanbanWidth(props.width ? props.width : '100%')
  }, [
    props.height,
    props.width,
    kanbanColumns,
  ])

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
                <KanbanColumn key={index} column={column} />
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Kanban