import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Base64Image from '@/components/Vip/Base64Image';
import { TicketTypes } from "@/types/collections";

interface Props {
    qrCode:string;
    entryInfo:string;
    locationInfo:string;
    friezeEntryInfo?:string | null;
    ticketType:TicketTypes;
    warningInfo:string;
}

export default function VipTempTicket({qrCode,entryInfo,locationInfo,friezeEntryInfo,ticketType,warningInfo}:Props){

    return (
  
        <div className="px-7 w-full">

            <div className="">
                <div className="bg-white px-7 pt-7 pb-3 rounded-tr-3xl rounded-tl-3xl text-center border-t border-r border-l border-neutral-500">
                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 200, width: "100%" }}>
                        <Base64Image base64String={qrCode} />
                    </div>
                    <p>{entryInfo}</p>
                    <p>{locationInfo}</p>
                    { friezeEntryInfo?  <p>{friezeEntryInfo}</p> : null }                  
                </div>
                <div className="bg-white flex justify-between ">
                    <div className=" h-4 w-4 border-t border-r  border-neutral-500 rounded-tr-full"/>
                    <div className=" h-4 w-4 border-t border-l  border-neutral-500 rounded-tl-full"/>
                </div>
                <div className=" flex justify-between">
                    <div className=" h-4 w-4 border-r border-b  border-neutral-500 rounded-br-full"/>
                    <div className=" h-4 flex-grow border-t-2 border-dashed border-neutral-500 "/>
                    <div className=" h-4 w-4 border-l border-b  border-neutral-500 rounded-bl-full"/>
                </div>
                <div className=" px-7 pt-3 pb-7 text-center border-x border-b border-neutral-500 rounded-br-3xl rounded-bl-3xl">
                    {ticketType == 'vip' ?  <h1 className="text-4xl font-semibold">VIP</h1> : null}
                    {ticketType == 'guest' ?  <h1 className="text-4xl font-semibold">GUEST</h1> : null}                   

                    <p>{warningInfo}</p>
                </div>
            </div>
        </div>

    )
}