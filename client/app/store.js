import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import AllMoviesSlice from '../features/Movies/AllMoviesSlice';
import AllTVshowsSlice from '../features/TVSHOWS/AllTVshowsSlice';
import SingleMovieSlice from '../features/Movies/SingleMovie/SingleMovieSlice';
import SingleTVshowSlice from '../features/TVSHOWS/SingleTVshows/SingleTVshowSlice';
import NavbarSlice from '../features/navbar/NavbarSlice';

import movieTrailerSlice from '../features/movieTrailer/movieTrailerSlice';
import MapSlice from '../features/Map/MapSlice';

import AllCreditsSlice from '../features/Credits/creditsSlice';






const store = configureStore({
  reducer: {
    auth: authReducer,
    AllMovies: AllMoviesSlice,
    AllTVshows: AllTVshowsSlice,
    SingleMovie: SingleMovieSlice,
    SingleTVshow: SingleTVshowSlice,
    MapSlice: MapSlice,
    Navbar: NavbarSlice,
    MovieTrailer: movieTrailerSlice,
    Credits: AllCreditsSlice,

   },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
