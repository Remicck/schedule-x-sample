import { useNextCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
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
  const calendar = useNextCalendarApp({
    locale: 'ja-JP',
    defaultView: viewWeek.name,
    isResponsive: true,
    plugins: [createDragAndDropPlugin(), createResizePlugin(), createEventModalPlugin(), eventsServicePlugin, new LoggerPlugin()],
    views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
    callbacks: {
      onEventUpdate (event ) {console.log(event)},
      onEventClick (event )  {console.log(event)},
      onRangeUpdate (range )  {console.log(range)},
      onSelectedDateUpdate (date: string)  {console.log(date)},
      onClickDate (date: string)  {console.log(date)},
      onDoubleClickDate (date: string)  {console.log(date)},
      onClickDateTime (dateTime: string)  {console.log(dateTime)},
      onDoubleClickDateTime (dateTime: string)  {console.log(dateTime)},
      onClickAgendaDate (date: string)  {console.log(date)},
      onClickPlusEvents (date: string)  {console.log(date)},
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