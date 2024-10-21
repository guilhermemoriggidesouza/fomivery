import { Dispatch, ReactElement, SetStateAction } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"

export type CartProps = {
    children: ReactElement,
    title: string,
    description: string,
    open: boolean,
    saveButton: ReactElement,
    onOpenChange: Dispatch<SetStateAction<boolean>>

}

export function CartModal({ title, description, children, open, onOpenChange }: CartProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white sm:max-w-[425px] h-max-screen">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div className="overflow-y-auto">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}