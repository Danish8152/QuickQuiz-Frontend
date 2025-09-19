import './index.css'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Categories from './Components/Categories'
import Challenge from './Components/Challenges'
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
import { useState } from 'react'

function App() {
  const [showSignUp, setShowSignUp] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  return (
    <div className='bg-black'>
      <Navbar onSignUpClick={()=>setShowSignUp(true)} onSignInClick={()=>setShowSignIn(true)}/>
      <Hero/>
      <Categories/>
      <Challenge/>
      {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
      {showSignIn && <SignIn onClose={()=> setShowSignIn(false)}/>}
    </div>
  )
}

export default App
