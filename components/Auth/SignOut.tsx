"use client"
import { createClient } from '@/utils/supabase/client';
import { useEffect } from "react"
import { useRouter } from "next/router"
import { navigate } from './actions';
import { Button } from "@/components/ui/button";
import { ExitIcon } from '@radix-ui/react-icons';


const supabase = createClient()

async function signOut() {
    await supabase.auth.signOut();
    navigate();
}

// import { signOut } from '@/lib/authActions';

const SignOut = () => (
    <Button onClick={signOut} variant="ghost">
        <ExitIcon/>
    </Button>
)

export default SignOut