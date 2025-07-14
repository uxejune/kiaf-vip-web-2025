import { redirect } from 'next/navigation'
import { checkUserAccount, logout } from '@/utils/supabase/auth_actions'
import { createClient } from '@/utils/supabase/server'
import Sidebar from '@/components/General/Sidebar'

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
    <div className='flex'>
      <Sidebar userEmail={user.email || 'no account'} userRole={user.role!} />
      <div>
        <p>Hello {user.email}</p>
        <button onClick={logout}>Log out</button>
      </div>
    </div>


  )
}