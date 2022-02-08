import './App.css'
import { useEffect } from 'react'
import useAuth from './hooks/useAuth'
import { Routes, Layout } from './utils'

const App = () => {
  const auth = useAuth()
  useEffect(() => {
    if (auth.user !== null) return
    auth.whoAmI()
  }, [])

  return (
    <div className='App'>
      <Layout>
        <Routes />
      </Layout>
    </div>
  )
}

export default App
