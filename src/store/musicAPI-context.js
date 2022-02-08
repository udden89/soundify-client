import React from 'react'

const MusicAPIContext = React.createContext({
	search: async (mediaType, query) => Promise,
})

export const MusicCtxProvider = (props) => {
	const API_URL = process.env.REACT_APP_API_URL_PROD

	const search = async (mediaType, query, next) => {
		try {
			const nextPage = next ? `&next=${next}` : ''
			const URL = `${API_URL}/api/search/${mediaType}?query=${query}${nextPage}`
			console.log(encodeURI(URL))

			const res = await fetch(`${encodeURI(URL)}`, {
				method: 'GET',
				/* headers: { 'Content-type': 'application/json' }, */
			})
			console.log(res)
			const data = await res.json()
			console.log(data)

			return data
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<MusicAPIContext.Provider
			value={{
				search: search,
			}}>
			{props.children}
		</MusicAPIContext.Provider>
	)
}

export default MusicAPIContext
