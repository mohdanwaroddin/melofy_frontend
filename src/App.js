
import './output.css';
import { BrowserRouter, Routes, Route, Navigate, useSubmit } from "react-router-dom";
import LoginComponent from './routes/Login';
import SignupComponent from './routes/Signup';
import HomeComponent from './routes/Home';
import LoggedInHomeComponent from './routes/LoggedinHome';
import UploadSong from "./routes/UploadSong";
import MyMusic from "./routes/MyMusic";
import Library from "./routes/Library";
import SearchPage from "./routes/SearchPage";
import AllSongs from "./routes/AllSongs";
import SinglePlaylistView from "./routes/SinglePlaylistView";


import { useCookies } from 'react-cookie';
import songContext from './contexts/songContext';
import { useState } from 'react';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [cookie, setCookie] = useCookies(["token"]);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  return (

    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {
          cookie.token ? (

            //Logged in routes;;;;;;;;;;;
            <songContext.Provider value={{
              currentSong,
              setCurrentSong,
              soundPlayed,
              setSoundPlayed,
              isPaused,
              setIsPaused,
            }}>
              <Routes>
                <Route path="/" element={<HelloComp />} />
                <Route path="/home" element={<LoggedInHomeComponent />} />
                <Route path='/myMusic' element={<MyMusic />} />
                <Route path='/library' element={<Library />} />
                <Route path='/search' element={<SearchPage />} />
                <Route path='/uploadSong' element={<UploadSong />} />
                <Route path='/allsongs' element={<AllSongs />} />

                <Route path='/playlist/:playlistId' element={<SinglePlaylistView />} />

                <Route path='*' element={<Navigate to="/home" />} />
                {/*** here we use path='*' means any other path redirected to given location.
               * when we already signed up, means our token is stored into cookies
               * then user can only go to home page, if user try to visite signup or login,
               * they will be redirected to home page only;
               *this provide the user amaizing service;
              */}
              </Routes>
            </songContext.Provider>

          ) : (
            //logged out routes;;;;;;;;;;;
            <Routes>

              {/*Adding routes component here */}
              {/*Path and Rendering */}
              <Route path="/home" element={<HomeComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/signup" element={<SignupComponent />} />
              <Route path='/allsongs' element={<AllSongs />} />

              {/**same as we dont have token, then it will always bring you on login page */}
              <Route path='*' element={<Navigate to="/login" />} />

            </Routes>
          )
        }

      </BrowserRouter>

    </div>

  );

};

const HelloComp = () => {
  return <div>This is hello component</div>;
}

export default App; 
