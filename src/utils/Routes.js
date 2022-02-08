import { Route, Routes } from 'react-router-dom'
import {
  AlbumPage,
  SearchPage,
  PlaylistPage,
  PlaylistSongPage,
  LoginPage,
  HomePage,
  ArtistPage,
  SignUpPage,
  ViewMore,
} from '../pages'
import { RedirectRoute, PrivateRoutes } from '.'

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* UnProtected routes */}
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<RedirectRoute />} />

        {/* Protected routes */}
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/artist/:id/album/:browseId' element={<AlbumPage />} />
          <Route path='/artist/:id' element={<ArtistPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/search/:query' element={<SearchPage />} />
          <Route path='/search/show-more' element={<ViewMore />} />
          <Route path='/myplaylists' element={<PlaylistPage />} />
          <Route path='/myplaylists/:id' element={<PlaylistSongPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default AppRoutes
