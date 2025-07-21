import { redirect } from 'next/navigation'
import { checkUserAccount, logout } from '@/utils/supabase/auth_actions'
import { createClient } from '@/utils/supabase/server'
import Sidebar from '@/components/General/Sidebar'
import Aside from '@/components/General/Aside/Aside';
import Image from 'next/image';

const accessibleRoles = ["master", "admin", "guestDev", "agent"];


export default async function PrivatePage() {
  const user = await checkUserAccount();

  const isAccessible = accessibleRoles.includes(user.role!);

  if (!isAccessible) {
    return (
      <p>you don&#39;t have a proper role to access</p>
    )
  }



  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b py-3 px-5">
        <h4>Admin Tool</h4>

      </div>

      <div className='flex flex-1'>
        {/* <Sidebar userEmail={user.email || 'no account'} userRole={user.role!} /> */}

        <Aside userEmail={user.email || 'no account'} userRole={user.role!} />

        <div className="p-4 w-full">
          <div className='flex items-center justify-center'>
            <Image className='inline w-auto h-auto' src={'/imgs/kiaf_logo_black.png'} alt='kiaf logo' width={180} height={40} />
          </div>
        </div>
      </div>

    </div>
  )
}