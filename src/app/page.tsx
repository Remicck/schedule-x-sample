import Calendar from "@/app/_components/Calendar/CalendarApp";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-between p-8">
      <Calendar />
    </div>
  );
}
