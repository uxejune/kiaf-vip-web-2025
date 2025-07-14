import Spinner from "@/components/General/Spinner/Spinner";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className='flex justify-center  w-full h-screen'>

            <div className="bg-black py-7 w-full max-w-[640px]  flex flex-col justify-center items-center gap-6">
                <Spinner className=' text-white'/>
            </div>
        </div>
    )
}