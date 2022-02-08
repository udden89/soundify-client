import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import s from './ViewMore.module.css'
import backIcon from '../../assets/icons/back.png'
import PlayBtn from '../../components/songlist/PlayBtn'
import SongListOption from '../../components/songlist/SongListOptions'
import {
  getThumbnailUrl,
  millisToMinutesAndSeconds,
} from '../../components/utils/utils'
import InfiniteScroll from 'react-infinite-scroll-component'
import MusicAPIContext from '../../store/musicAPI-context'
import SongListItem from '../../components/songlist/SongListItem'
import { SongList } from '../../components'

const ViewMore = () => {
  let navigate = useNavigate()

  const musicAPI = useContext(MusicAPIContext)

  const query = new URLSearchParams(useLocation().search)
  const type = query.get('query')
  const name = query.get('name')

  const [dataToRender, setDataToRender] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [nextUrl, setNextUrl] = useState('')
  const [capInfinityScroll, setCapInfinityScroll] = useState(true)

  useEffect(() => {
    const fetchSearch = async () => {
      setIsLoading(true)

      let res = await musicAPI.search(type, name)
      setDataToRender(res.content)
      setNextUrl(res.next)
      if (res) setIsLoading(false)
    }
    fetchSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, name, nextUrl])

  const handleGoback = () => {
    navigate(-1)
  }

  const fetchNextPage = async () => {
    if (dataToRender.length > 150) {
      return setCapInfinityScroll(false)
    }

    let response2 = await musicAPI.search(type, name, nextUrl)
    if (response2.message) return
    setTimeout(() => {
      setDataToRender((prevData) => [...prevData, ...response2.content])
    }, 1500)
    return
  }

  function goTo(ele) {
    if (ele.type === 'album' || ele.type === 'single') {
      navigate(`/artist/${ele.artist}/album/${ele.browseId}`)
    } else if (ele.type === 'artist') {
      navigate(`/artist/${ele.browseId}`)
    }
  }

  return (
    <div className={s.container}>
      <div
        className={s.header}
        onClick={() => {
          handleGoback()
        }}
      >
        <img src={backIcon} alt='' />
        <h1>
          {type.charAt(0).toUpperCase()}
          {type.slice(1)} found:
        </h1>
      </div>
      {isLoading && <div className={isLoading ? 'loader' : ''}></div>}
      {/* <div id='scrollableDiv' style={{ height: '99vh', overflowY: 'scroll' }}> */}
      <InfiniteScroll
        dataLength={dataToRender.length}
        next={fetchNextPage}
        hasMore={capInfinityScroll}
        loader={
          <p style={{ textAlign: 'center', color: 'black' }}>
            <b>Loading...</b>
          </p>
        }
        endMessage={
          <p style={{ textAlign: 'center', color: 'black' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {!isLoading ? (
          dataToRender[0]?.type === 'song' ? (
            <SongList songs={dataToRender} header={'Songs by ' + name} />
          ) : (
            dataToRender.map((ele, index) => {
              return (
                <div
                  className={s.viewMoreItem}
                  key={index}
                  onClick={() => {
                    goTo(ele)
                  }}
                >
                  <div className={s.mainContent}>
                    <h1
                      className={
                        ele.type !== 'song' ? s.artistTitle : s.songTitle
                      }
                    >
                      {ele.name.substring(0, 20)}{' '}
                      {ele.name.length > 20 ? '...' : ''}
                    </h1>

                    {ele.type !== 'song' && (
                      <img src={getThumbnailUrl(ele)} alt='artist or album' />
                    )}
                  </div>
                  {typeof ele.artist === 'string' && <p>By: {ele.artist}</p>}
                  {!ele.artist && <p>Go to artist page</p>}
                  {ele.type === 'song' && (
                    <p>
                      {ele.artist?.name ? ele.artist?.name : ''} -{' '}
                      {millisToMinutesAndSeconds(ele.duration)}
                    </p>
                  )}
                </div>
              )
            })
          )
        ) : (
          ''
        )}
      </InfiniteScroll>
    </div>
  )
}

export default ViewMore
