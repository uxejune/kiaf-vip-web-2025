import { Rsvp } from "@/types/collections";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ApplicantList from "./ApplicantsList";
import RsvpEditButton from "./RsvpEditButton";
import TimeSlotList from "./TimeSlotList";
import AddTimeSlotButton from "./AddTimeSlotButton";

interface Props {
    rsvp: Rsvp
}

export default function RsvpDetailButton({ rsvp }: Props) {

    

    
    return (
        <Sheet>
            <SheetTrigger asChild><Button variant={"outline"} size={"sm"}>Detail</Button></SheetTrigger>
            <SheetContent className="w-[600px] max-w-none sm:max-w-none">
                <SheetHeader>
                    <Badge>
                        {rsvp.is_main == "1" ? "Main" : "Time Slot"}
                    </Badge>
                    <SheetTitle>{rsvp.post_title}</SheetTitle>

                </SheetHeader>

                <div className="p-4 space-y-4">
                    <RsvpEditButton rsvp={rsvp} />
                    <hr />

                    {rsvp.is_main == "1" ?

                        // main RSVP
                        <div className="space-y-4">

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Total Capacity
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-2xl">
                                    {rsvp.total_count}
                                </CardContent>
                            </Card>

                            {rsvp.companion == "1" ? <Badge variant={"secondary"}>Companion is allowed.</Badge> : <Badge>Companion is not allowed.</Badge>}



                            {rsvp.applicants && rsvp.applicants.length > 0 ? <ApplicantList applicants={rsvp.applicants} /> : <p>No applicants yet.</p>}

                        </div>

                        :

                        <div className="space-y-4">

                            

                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold">Time Slot list</h2>
                                <AddTimeSlotButton rsvp={rsvp}/>
                            </div>



                            {rsvp.timeSlots != null &&
                                <TimeSlotList rsvp={rsvp} />
                            }




                        </div>

                    }



                </div>



            </SheetContent>
        </Sheet>
    )
}