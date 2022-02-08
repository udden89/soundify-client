import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const RedirectRoute = () => {
  const navigate = useNavigate()

  useEffect(() => {
    let loggedIn = window.localStorage.getItem('loggedIn')
    if (!loggedIn) return navigate('login')
    navigate('/')
  }, [])

  return null
}

export default RedirectRoute
