import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Phone from './components/phone/Phone'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Phone></Phone>
    </>
  )
}

export default App
