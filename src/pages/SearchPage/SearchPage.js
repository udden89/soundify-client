import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AlbumSlider, ArtistSlider, SongList } from '../../components'
import s from './SearchPage.module.css'
import backIcon from '../../assets/icons/back.png'
import LatestSearch from '../../components/searchPage/LatestSearch'
import {
  getDataLocalStorage,
  populateLocalStorage,
} from '../../components/utils/utils'
import MusicAPIContext from '../../store/musicAPI-context'

const SearchPage = () => {
  let navigate = useNavigate()

  let timer
  const waitTime = 1000

  const [searchParams, setSearchParams] = useSearchParams()
  const [artists, setArtist] = useState([])
  const [albums, setAlbums] = useState([])
  const [songs, setSongs] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const musicAPI = useContext(MusicAPIContext)

  const activeSearch = searchParams.get('query')

  useEffect(() => {
    const fetchSearch = async () => {
      if (!searchParams.get('query')) return
      setIsLoading(true)

      let res = await musicAPI.search('search', searchParams.get('query'))
      sortFetchedData(res.content)
      if (res) setIsLoading(false)
    }

    fetchSearch()
  }, [musicAPI, navigate, searchParams])

  const handleSearchInput = async (e) => {
    let query = e.target.value

    if (e.key === 'Enter') setSearchParams({ query })
    clearTimeout(timer)

    //Waiting for user finished typing
    timer = setTimeout(() => {
      if (!e.target.value.length > 0) {
        setSearchParams({})
        navigate(-2) //Route back to '/search'
      }

      setSearchParams({ query })
      addNewSearchToLoaclStorage(e.target.value)
    }, waitTime)
  }

  const sortFetchedData = (data) => {
    let newSongs = []
    let newArtists = []
    let newAlbums = []

    data.forEach((element) => {
      if (element.type === 'song' || element.type === 'video') {
        newSongs.push(element)
      } else if (element.type === 'artist') {
        newArtists.push(element)
      } else if (element.type === 'album') {
        newAlbums.push(element)
      }
    })

    setArtist(newArtists)
    setSongs(newSongs)
    setAlbums(newAlbums)
  }

  const addNewSearchToLoaclStorage = (query) => {
    query = query.toLowerCase()
    let newSearches = getDataLocalStorage('latestSearches')

    if (query?.length <= 0) return
    if (!newSearches) newSearches = []

    if (newSearches.includes(query)) {
      const index = newSearches.indexOf(query)
      newSearches.splice(index, 1)
    } else if (newSearches.length >= 5) {
      newSearches.length = 4
    }

    newSearches.unshift(query)

    populateLocalStorage('latestSearches', newSearches)

    return newSearches
  }

  const handleGoback = () => {
    navigate('/search')
  }

  return (
    <>
      {
        <div className={s.container}>
          <h1>Search {activeSearch ? `"${activeSearch}"` : null}</h1>
          <input
            className={`${s.searchInput} ${s.icon}`}
            placeholder={'Artists, songs or albums'}
            onChange={handleSearchInput}
          />
          <div
            className={s.header}
            onClick={() => {
              handleGoback()
            }}
          >
            {activeSearch && <img src={backIcon} alt='' />}
          </div>
          {!activeSearch && <LatestSearch />}

          {activeSearch && (
            <div className={isLoading ? 'loader' : ''}>
              {artists.length > 0 && !isLoading && (
                <div>
                  <ArtistSlider
                    artists={artists}
                    header={`Artist results on "${searchParams.get('query')}"`}
                  />
                </div>
              )}
              {albums.length > 0 && !isLoading && (
                <div>
                  <AlbumSlider
                    albums={albums}
                    header={`Album results on "${searchParams.get('query')}"`}
                  />
                </div>
              )}

              {songs.length > 0 && !isLoading && artists && (
                <div>
                  <SongList
                    songs={songs.slice(0, 5)}
                    header={`Songs results on "${searchParams.get('query')}"`}
                    artist={activeSearch}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      }
    </>
  )
}

export default SearchPage
