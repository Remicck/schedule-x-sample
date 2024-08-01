import type { CalendarAppSingleton } from "@schedule-x/shared";
import hotkeys from "hotkeys-js";

class HandleKeyboardShortcutPlugin {
  name = "calendars-updater";
  $app!: CalendarAppSingleton;
  views: string[] = [];
  viewHotkeyMap: Record<string, string> = {
    d: "day",
    w: "week",
    m: "month-grid",
    a: "month-agenda",
  };

  destroy(): void {}

  init($app: CalendarAppSingleton): void {
    this.$app = $app;
    if (this.$app.config.views.length > 0) {
      this.views = this.$app.config.views.map((view) => view.name);
    }
    this.keyboardShortcutRegister();
  }

  keyboardShortcutRegister() {
    console.log("register process", this.views);

    for (const key of Object.keys(this.viewHotkeyMap)) {
      const viewName = this.viewHotkeyMap[key];
      if (this.views.includes(viewName)) {
        hotkeys(key, (event, _handler) => {
          event.preventDefault();

          console.log("dou1?", this.$app.config);
          // @ts-expect-error
          this.$app.config.plugins.calendarControls.setView(viewName);
        });
      }
    }
  }
}
export const handleKeyboardShortcutPlugin = new HandleKeyboardShortcutPlugin();
