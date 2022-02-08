import styles from './LoginPage.module.scss'
import { Twitter, Facebook, Google } from '../../assets/icons'
import { useRef } from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router'

const LoginForm = () => {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const ctx = useAuth()
  const navigate = useNavigate()

  const loginUser = async (e) => {
    e.preventDefault()
    if (
      await ctx.loginHandler(
        usernameRef.current.value,
        passwordRef.current.value
      )
    ) {
      navigate('/')
    }
  }

  const onNavigateRegisterPage = () => {
    navigate('/signup')
  }

  return (
    <div className={styles['login-page__container']}>
      <div className={styles['login-page__content']}>
        <h1>LOGIN</h1>
        <form onSubmit={loginUser}>
          <input
            ref={usernameRef}
            type='email'
            required
            placeholder='Email..'
          />
          <input
            ref={passwordRef}
            type='password'
            required
            placeholder='Password..'
          />
          <button type='submit'>CONTINUE</button>
        </form>
        <button onClick={onNavigateRegisterPage}>SIGN UP</button>
      </div>
      <div className={styles['login-page__oauth']}>
        <h2>Or login with</h2>
        <ul className={styles['oauth__container']}>
          <li>
            <img src={Facebook} />
          </li>
          <li>
            <img src={Twitter} />
          </li>
          <li>
            <img src={Google} />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default LoginForm
