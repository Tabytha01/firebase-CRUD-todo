import {useState} from 'react'
import { createUserWithEmailAndPassword} from 'firebase/authfirebase/auth' 
import {auth} from '../../../lib/firebase'
import {useRouter} from 'next/navigation'

export default function Register() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{
        await createUserWithEmailAndPassword(auth, email, password)
     alert('Account created successfully!')
     router.push('/auth/login')
    }
    catch (error: any) {
      alert(error.message)
    }
    }
     
