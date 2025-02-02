import { Dispatch, ReactElement, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export type SugestionProps = {
  children: ReactElement;
  title: string;
  description: string;
  saveButton: ReactElement;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

export function SugestionModal({
  title,
  description,
  children,
  saveButton,
  open,
  onOpenChange,
}: SugestionProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter className="mb-8">{saveButton}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
