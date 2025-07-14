import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import DateEditForm from "./DateEditForm";


interface Props {
    type: "fair" | "viewingRoom";
    startDate?: Date;
    endDate?: Date;
}

export default function DateEditButton({ type, startDate, endDate }: Props) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"outline"} size={"sm"}>Edit</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{type === "fair" ? "Edit Art Fair date" : "Edit Viewing Room date"}</SheetTitle>
                    <SheetDescription>
                        This setting is for test purposes only and will change the dates stored on the server.
                    </SheetDescription>
                </SheetHeader>

                <div className="py-4">
                    <DateEditForm type={type} startDate={startDate} endDate={endDate} />
                </div>



            </SheetContent>
        </Sheet>
    )
}