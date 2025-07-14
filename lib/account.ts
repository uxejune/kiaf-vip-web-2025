import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
// import supabaseClient from '@/utils/supabase/supabaseClient'



export async function  checkUserAccount() {
    const cookieStore = cookies()
    const supabase = await createClient();
    const { data : accountData , error : accountDataError } = await supabase.auth.getUser()

    if (accountDataError || !accountData?.user) {
        redirect('/login')
    }

    const query = supabase
        .from('adminAccount')
        .select('*')
        .eq('id',accountData.user!.id)
        .single();

    const {data: roleData, error: roleDataError} = await query;




    return ({
        id:accountData.user.id,
        email:accountData.user.email,
        role:roleData?.role
    })
}
