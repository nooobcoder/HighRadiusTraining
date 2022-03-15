import React from 'react'
import './style.css'

export default function App() {
  const [counter, setCounter] = React.useState(0)

  return (
    <>
      <button onClick={() => setCounter(counter + 1)} type='button'>
        Click Me
      </button>
      <div>{counter}</div>
    </>
  )
}
