import type { CalendarAppSingleton } from "@schedule-x/shared";

class HandleKeyboardShortcutPlugin {
  name = "calendars-updater";
  $app!: CalendarAppSingleton;
  views: string[] = [];

  destroy(): void {}

  init($app: CalendarAppSingleton): void {
    this.$app = $app;
    if (this.$app.config.views.length > 0) {
      this.views = this.$app.config.views.map((view) => view.name);
    }
    this.keyboardShortcutRegister();
  }

  keyboardShortcutRegister() {
    console.log("register process");
  }

  checkViews(): void {
    console.log(this.$app);
    console.log("view list", this.views);
  }

  // updateCalendars(): void {
  //   this.$app.config.calendars.value = {
  //     ...this.$app.config.calendars.value,
  //     personal: {
  //       colorName: 'personal',
  //       lightColors: {
  //         main: 'yellow',
  //         container: '#000',
  //         onContainer: 'yellow',
  //       },
  //       darkColors: {
  //         main: '#fff5c0',
  //         onContainer: '#fff5de',
  //         container: '#a29742',
  //       },
  //     },
  //   }
  // }
}
export const handleKeyboardShortcutPlugin = new HandleKeyboardShortcutPlugin();
