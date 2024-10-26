import { Dispatch, ReactElement, SetStateAction } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"

export type CartProps = {
    children: ReactElement,
    open: boolean | string | undefined,
    onOpenChange: () => void
}

export function ImageModal({ children, open, onOpenChange }: CartProps) {
    return (
        <Dialog open={Boolean(open)} onOpenChange={onOpenChange} >
            <DialogContent className="bg-white h-max-screen flex flex-col">
                <div className="m-4">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}