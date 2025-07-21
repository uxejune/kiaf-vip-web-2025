import { Applicant, TimeSlot } from "@/types/collections";
import TimeSlotDeleteButton from "./TimeSlotDeleteButton";
import CancelApplicantButton from "./CancelApplicantButton";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ApplicantList from "./ApplicantsList";
import { time } from "console";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import TimeSlotEditButton from "./TimeSlotEditButton";

interface Props {
    rsvpId: string;
    timeSlot: TimeSlot;
}

export default function TimeSlotItem({ timeSlot, rsvpId }: Props) {

    const totalCount = (timeSlot.applicants ?? []).reduce(
        (sum, applicant) => sum + Number(applicant.with_companion ?? 0),
        0
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>{timeSlot.event_date.substring(2)} {timeSlot.start_time.substring(0, 5)}-{timeSlot.end_time.substring(0, 5)} </CardTitle>
                <CardDescription>
                    <div className="flex gap-2">
                        Capacity : {totalCount} / {timeSlot.total_count}
                        {timeSlot.companion == "1" ? <Badge variant={"secondary"}>Companion is allowed.</Badge> : <Badge>Companion is not allowed.</Badge>}
                    </div>
                </CardDescription>
                <CardAction>
                    <TimeSlotEditButton rsvpId={rsvpId} timeSlot={timeSlot} />
                    <TimeSlotDeleteButton timeSlot={timeSlot} />
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-4">

                {timeSlot.applicants && timeSlot.applicants.length > 0 &&
                    <ApplicantList applicants={timeSlot.applicants} />
                }

            </CardContent>




        </Card>
    )
}