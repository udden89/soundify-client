import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  let loggedIn = window.localStorage.getItem('loggedIn')
  return loggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoutes
