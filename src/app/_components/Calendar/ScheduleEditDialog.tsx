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

type ScheduleEditDialogProps = {
  id: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
export function ScheduleEditDialog(props: ScheduleEditDialogProps) {
  const { id, isOpen, setIsOpen } = props;
  console.log("props", props);
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
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => setIsOpen(false)}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
