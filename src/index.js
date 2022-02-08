import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './store/auth-context'
import PlayerProvider from './store/playerContext'
import { MusicCtxProvider } from './store/musicAPI-context'

ReactDOM.render(
	<PlayerProvider>
		<AuthContextProvider>
			<MusicCtxProvider>
				<BrowserRouter>
					<App />
					<ToastContainer theme='colored' position='bottom-center' />
				</BrowserRouter>
			</MusicCtxProvider>
		</AuthContextProvider>
	</PlayerProvider>,
	document.getElementById('root')
)
