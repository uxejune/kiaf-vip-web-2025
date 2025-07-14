import { checkUserAccount } from "@/lib/account"
import Aside from "@/components/General/Aside/Aside"
import VipList from "@/components/Vip/VipList";



const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

const urlencoded = new URLSearchParams();
urlencoded.append("type", "partner");

const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow" as RequestRedirect // Explicitly cast to RequestRedirect
};


const partnerVipList = async () => {
    try {
        const res = await fetch("https://kiafvip.kiaf.org/api/admin/vip_list", requestOptions);
        const data = await res.json();
        

        
        return (data)

    } catch (err) {
        console.log(err);

        return (err)
    }
};

const accessibleRoles = ["master","admin","agent"];

export default async function Page(){

    const user = await checkUserAccount();
    const isAccessible = accessibleRoles.includes(user.role!);

    if (!isAccessible){
        return (
            <p>you don&#39;t have a proper role to access</p>
        )
    }

    const partnerVipListData = await partnerVipList();




    return(
        <div className="flex min-h-screen flex-col ">
            <div className="border-b py-3 px-5">
                <h4>Admin Tool</h4>
            </div>
            <div className="flex flex-1">
                <Aside userEmail={user.email || 'no account'} userRole={user.role!}/>
                <div className="p-4 w-full">
                    <h1 className="heading-1 mb-4">Partner VIP</h1>
                    {/* <VipList vips={data} itemsPerPage={10} /> */}
                    <VipList vips={partnerVipListData} listType='partner' itemsPerPage={10} isAdmin/>
                </div>
            </div>

        </div>
    )
}