import LoginForm from '@/components/Login/LoginForm'
import { login, signup } from '@/utils/supabase/auth_actions'

export default function LoginPage() {
  return (
    <div>

    
    <LoginForm/>

    {/* <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form> */}

    </div>
  )
}