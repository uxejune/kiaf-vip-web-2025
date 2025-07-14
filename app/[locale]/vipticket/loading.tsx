import Spinner from "@/components/General/Spinner/Spinner";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className='flex items-center justify-center w-full h-screen'>


                <Spinner/>

        </div>
    )
}