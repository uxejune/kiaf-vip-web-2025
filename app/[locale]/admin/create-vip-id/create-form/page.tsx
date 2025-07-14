import { checkUserAccount } from "@/lib/account"
import Aside from "@/components/General/Aside/Aside"
import CreatedIdForm from "@/components/CreatedId/CreateIdForm";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

const urlencoded = new URLSearchParams();

const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow" as RequestRedirect // Explicitly cast to RequestRedirect
};

const accessibleRoles = ["master"];

const partnerList = async () => {
    try {
        const res = await fetch("https://kiafvip.kiaf.org/api/admin/partners", requestOptions);
        const data = await res.json();
        
        
        return (data)

    } catch (err) {
        console.log(err);

        return (err)
    }
};

export default async function Page(){

    const user = await checkUserAccount();
    const partnerListData = await partnerList();

    const isAccessible = accessibleRoles.includes(user.role!);

    if (!isAccessible){
        return (
            <p>you don&#39;t have a proper role to access</p>
        )
    }

    return(
        <div className="flex min-h-screen flex-col ">
            <div className="border-b py-3 px-5">
                <h4>Admin Tool</h4>
            </div>
            <div className="flex flex-1">
                <Aside userEmail={user.email || 'no account'} userRole={user.role!}/>
                <div className="p-4 w-full">
                    <h1 className="heading-1 pb-4">ID Creation Form</h1>
                    <CreatedIdForm partners={partnerListData}/>
                </div>
            </div>
        </div>
    )

}