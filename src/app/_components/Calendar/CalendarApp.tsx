'use client'
import { viewDay, viewMonthAgenda, viewMonthGrid, viewWeek } from '@schedule-x/calendar'
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react'
import type { CalendarAppSingleton } from '@schedule-x/shared'

import '@schedule-x/theme-default/dist/index.css'
import { handleKeyboardShortcutPlugin } from '@/app/_components/Calendar/plugins/handleKeyboardShortcutPlugin'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createResizePlugin } from '@schedule-x/resize'

const eventsServicePlugin = createEventsServicePlugin()
class LoggerPlugin {
  name = 'logger-plugin'

  init($app: CalendarAppSingleton) {
    console.log('$app', $app)
    for (const event of $app.calendarEvents.list.value) {
      console.log('init', event)
    }
  }
}
function Calendar() {
  const calendar = useCalendarApp({
    locale: 'ja-JP',
    defaultView: viewMonthGrid.name,
    isResponsive: true,
    plugins: [
      createDragAndDropPlugin(),
      createResizePlugin(),
      createEventModalPlugin(),
      eventsServicePlugin,
      new LoggerPlugin(),
      handleKeyboardShortcutPlugin,
    ],
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
        handleKeyboardShortcutPlugin.checkViews()
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
