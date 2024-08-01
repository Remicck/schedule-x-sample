"use client";
import {
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from "@schedule-x/calendar";
import { ScheduleXCalendar, useNextCalendarApp } from "@schedule-x/react";
import type { CalendarAppSingleton } from "@schedule-x/shared";

import "@schedule-x/theme-default/dist/index.css";
import { ScheduleEditDialog } from "@/app/_components/Calendar/ScheduleEditDialog";
import { handleKeyboardShortcutPlugin } from "@/app/_components/Calendar/plugins/handleKeyboardShortcutPlugin";
import {
  formatDateToString,
  getNearestHalfHour,
  stringDatetimeToDate,
} from "@/app/_components/Calendar/util";
import { createCalendarControlsPlugin } from "@schedule-x/calendar-controls";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createResizePlugin } from "@schedule-x/resize";
import { addMinutes } from "date-fns";
import { useState } from "react";

const calendarControls = createCalendarControlsPlugin();
const eventsServicePlugin = createEventsServicePlugin();
class LoggerPlugin {
  name = "logger-plugin";

  init($app: CalendarAppSingleton) {
    console.log("$app", $app);
    for (const event of $app.calendarEvents.list.value) {
      console.log("init", event);
    }
  }
}
function Calendar() {
  const [isOpen, setIsOpen] = useState(false);

  const calendar = useNextCalendarApp({
    locale: "ja-JP",
    defaultView: viewMonthGrid.name,
    isResponsive: true,
    plugins: [
      createDragAndDropPlugin(),
      createResizePlugin(),
      createEventModalPlugin(),
      eventsServicePlugin,
      calendarControls,
      handleKeyboardShortcutPlugin,
      new LoggerPlugin(),
    ],
    views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
    callbacks: {
      onRangeUpdate(range) {
        console.log("onRangeUpdate", range);
      },

      onEventUpdate(event) {
        console.log("onEventUpdate", event);
      },

      onEventClick(event) {
        console.log("onEventClick", event);
      },

      onClickDate(date) {
        console.log("onClickDate", date);
        addEvent(date);
      },

      onClickDateTime(dateTime) {
        setIsOpen(true);

        console.log("onClickDateTime", dateTime);
        const D = stringDatetimeToDate(dateTime);
        const startDatetime = getNearestHalfHour(D);
        const endDatetime = addMinutes(startDatetime, 30);

        const id = Math.floor(Math.random() * 100000).toString();
        eventsServicePlugin.add({
          id: Math.floor(Math.random() * 100000).toString(),
          title: `New event ${id}`,
          start: formatDateToString(startDatetime),
          end: formatDateToString(endDatetime),
        });
      },

      onClickAgendaDate(date) {
        console.log("onClickAgendaDate", date);
      },

      onClickPlusEvents(date) {
        console.log("onClickPlusEvents", date);
      },

      onSelectedDateUpdate(date) {
        console.log("onSelectedDateUpdate", date);
      },

      onDoubleClickDateTime(dateTime) {
        console.log("onDoubleClickDateTime", dateTime);
      },

      onDoubleClickDate(date) {
        console.log("onDoubleClickDate", date);
      },
      //
      // isCalendarSmall($app) {
      //   return $app.elements.calendarWrapper!.clientWidth! < 500
      // }
    },
    events: [
      {
        id: "1",
        title: "Event 1",
        start: "2024-07-30 10:00",
        end: "2024-07-30 11:00",
      },
    ],
  });

  const addEvent = (date: string) => {
    setIsOpen(true);
    console.log("method", date);
    const id = Math.floor(Math.random() * 100000).toString();
    eventsServicePlugin.add({
      id,
      title: `New event ${id}`,
      start: date,
      end: date,
      specialProperty: `id: ${id}\nこれが特別なプロパティです`,
      description: `id: ${id}\nこちらは説明プロパティです`,
    });
    console.log("events", eventsServicePlugin.getAll());
  };

  console.log("parent component", isOpen);

  return (
    <div className="h-full w-full">
      <ScheduleXCalendar calendarApp={calendar} />
      <ScheduleEditDialog id="1" isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default Calendar;
