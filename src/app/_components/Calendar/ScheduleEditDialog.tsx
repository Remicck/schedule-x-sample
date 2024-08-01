import {
  formatDateToString,
  getNearestHalfHour,
} from "@/app/_components/Calendar/util";
import { Button } from "@/app/_components/ui/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/ui/dialog";
import { Input } from "@/app/_components/ui/ui/input";
import { Label } from "@/app/_components/ui/ui/label";
import { addMinutes } from "date-fns";
import { useState } from "react";

type ScheduleEditDialogProps = {
  id: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addEvent: (
    title: string,
    description: string,
    start: string,
    end: string,
  ) => void;
};
type Form = {
  title: string;
  start: string;
  end: string;
  description: string;
};
export function ScheduleEditDialog(props: ScheduleEditDialogProps) {
  const { id, isOpen, setIsOpen, addEvent } = props;
  const [form, setForm] = useState<Form>({
    title: "",
    start: formatDateToString(getNearestHalfHour(new Date())),
    end: formatDateToString(addMinutes(getNearestHalfHour(new Date()), 30)),
    description: "",
  });
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile id is {id}</DialogTitle>
          <DialogDescription>
            {`Make changes to your profile here. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              title
            </Label>
            <Input
              id="title"
              defaultValue="Pedro Duarte"
              className="col-span-3"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              start
            </Label>
            <Input
              id="start"
              defaultValue="Pedro Duarte"
              className="col-span-3"
              value={form.start}
              onChange={(e) => setForm({ ...form, start: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              end
            </Label>
            <Input
              id="end"
              defaultValue="Pedro Duarte"
              className="col-span-3"
              value={form.end}
              onChange={(e) => setForm({ ...form, end: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              description
            </Label>
            <Input
              id="description"
              defaultValue="@peduarte"
              className="col-span-3"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              addEvent(form.title, form.description, form.start, form.end);
              setIsOpen(false);
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
