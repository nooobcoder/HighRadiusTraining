import React, { useEffect } from 'react'
import './style.css'
import { config } from 'dotenv'



export default function App() {
  /* const doApi = async () => {
    const response = await await fetch()
    console.log(response)
  } */

  useEffect(() => console.log(process.env), [])

  return <div>Hello World!</div>
}
