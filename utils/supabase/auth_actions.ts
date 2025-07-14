'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { UserAccount } from '@/types/collections'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/admin')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('로그아웃 에러:', error);
  } else {
    redirect('/login')
  }
}


export async function checkUserAccount(): Promise<UserAccount> {

  const supabase = await createClient();
  let userAccount: UserAccount | null = null;

  const { data: accountData, error: accountDataError } = await supabase.auth.getUser();

  if (accountDataError || !accountData?.user) {
    redirect('/login')
  }

  let query = supabase
    .from('adminAccount')
    .select('*')
    .eq('id',accountData.user!.id)
    .single();

  const { data: roleData, error: roleDataError } = await query;

  if (roleDataError || !roleData) {
    throw new Error(roleDataError?.message || 'Failed to get user accout');
  }

  userAccount = {
    ...roleData,
    email: accountData.user.email,
  };
  

  if (!userAccount) {
    throw new Error('User account not found');
  }

  return userAccount;
}
