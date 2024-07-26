'use client'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  viewWeek,
  viewDay,
  viewMonthGrid,
  viewMonthAgenda,
} from '@schedule-x/calendar'
 
import '@schedule-x/theme-default/dist/index.css'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createResizePlugin } from '@schedule-x/resize'
import { createEventModalPlugin } from '@schedule-x/event-modal'
 
function Calendar() {
  const calendar = useCalendarApp({
    defaultView: viewMonthGrid.name,
    plugins: [createDragAndDropPlugin(), createResizePlugin(), createEventModalPlugin()],
    views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2024-07-25 10:00',
        end: '2024-07-25 11:00',
      },
    ],
  })
 
  return (
    <div className="w-full">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
 
export default Calendar