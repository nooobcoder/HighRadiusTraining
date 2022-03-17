import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

export default function App() {
  const [data, setData] = React.useState({ username: '', password: '' })
  const { username, password } = data

  // e: Event Object
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <center>
        <form action=''>
          <input type='text' name='username' value={username} onChange={onChangeHandler} />
          <br />
          <input type='password' name='password' value={password} onChange={onChangeHandler} />
          <br />
          <button type='submit' name='submit' onClick={null}>
            Submit
          </button>
        </form>
      </center>
    </div>
  )
}

App.defaultProps = { data: PropTypes.oneOfType([PropTypes.object]) }
