import { Dispatch, ReactElement, SetStateAction } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"

export type CartProps = {
    children: ReactElement,
    open: boolean | string | undefined,
    title: string,
    description: string,
    onOpenChange: () => void
}

export function ImageModal({ children, title, description, open, onOpenChange }: CartProps) {
    return (
        <Dialog open={Boolean(open)} onOpenChange={onOpenChange} >
            <DialogContent className="bg-white h-max-screen flex flex-col">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div className="m-4">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}