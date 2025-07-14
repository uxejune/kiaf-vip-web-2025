import SignInWithEmail from "@/components/Auth/SigninWithEmail";

export default function Page(){
    return(
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-96">

                <SignInWithEmail/>

                {/* <SignInWithGoogle/> */}
                
            </div>
        </div>
    )
}