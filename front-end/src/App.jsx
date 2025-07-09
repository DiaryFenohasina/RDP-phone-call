import { useState } from 'react'
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
