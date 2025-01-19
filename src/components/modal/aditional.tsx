import { Dispatch, ReactElement, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export type CartProps = {
  children: ReactElement;
  title: string;
  open: boolean;
  saveButton: ReactElement;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

export function AdditionalModal({
  title,
  children,
  open,
  saveButton,
  onOpenChange,
}: CartProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-max-screen flex flex-col bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="h-max-[400px] overflow-y-auto">{children}</div>
        <DialogFooter>{saveButton}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
