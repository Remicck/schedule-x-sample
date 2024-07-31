'use client';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react'
import {
  viewWeek,
  viewDay,
  viewMonthGrid,
  viewMonthAgenda,
} from '@schedule-x/calendar'
import { CalendarAppSingleton } from '@schedule-x/shared'

import '@schedule-x/theme-default/dist/index.css'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createResizePlugin } from '@schedule-x/resize'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createEventsServicePlugin } from '@schedule-x/events-service'

const eventsServicePlugin = createEventsServicePlugin();
class LoggerPlugin {
  name = 'logger-plugin'
 
  init($app: CalendarAppSingleton) {
    console.log('$app', $app);
    $app.calendarEvents.list.value.forEach((event) => {
      console.log('init', event)
    })
  }
}
function Calendar() {
  const calendar = useCalendarApp({
    locale: 'ja-JP',
    defaultView: viewMonthGrid.name,
    isResponsive: true,
    plugins: [createDragAndDropPlugin(), createResizePlugin(), createEventModalPlugin(), eventsServicePlugin, new LoggerPlugin()],
    views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
    callbacks: {
      onRangeUpdate(range) {
        console.log('onRangeUpdate', range)
      },
  
      onEventUpdate(event) {
        console.log('onEventUpdate', event)
      },
  
      onEventClick(event) {
        console.log('onEventClick', event)
      },
  
      onClickDate(date) {
        console.log('onClickDate', date)
      },
  
      onClickDateTime(dateTime) {
        console.log('onClickDateTime', dateTime)
      },
  
      onClickAgendaDate(date) {
        console.log('onClickAgendaDate', date)
      },
  
      onClickPlusEvents(date) {
        console.log('onClickPlusEvents', date)
      },
  
      onSelectedDateUpdate(date) {
        console.log('onSelectedDateUpdate', date)
      },
  
      onDoubleClickDateTime(dateTime) {
        console.log('onDoubleClickDateTime', dateTime)
      },
  
      onDoubleClickDate(date) {
        console.log('onDoubleClickDate', date)
      },
      //
      // isCalendarSmall($app) {
      //   return $app.elements.calendarWrapper!.clientWidth! < 500
      // }
    },
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2024-07-30 10:00',
        end: '2024-07-30 11:00',
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