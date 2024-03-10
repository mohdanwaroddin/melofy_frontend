
import './output.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from './routes/Login';
import SignupComponent from './routes/Signup';
import HomeComponent from './routes/Home';
import LoggedInHomeComponent from './routes/LoggedinHome';
import UploadSong from "./routes/UploadSong";

import { useCookies } from 'react-cookie';

function App() {
  const [cookie, setCookie] = useCookies(["token"]);
  console.log(cookie.token);
  return (

    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {
          cookie.token ? (
            //Logged in routes;;;;;;;;;;;
            <Routes>
              <Route path="/" element={<HelloComp />} />
              <Route path="/home" element={<LoggedInHomeComponent />} />
              {/*** here we use path='*' means any other path redirected to given location.
               * when we already signed up, means our token is stored into cookies
               * then user can only go to home page, if user try to visite signup or login,
               * they will be redirected to home page only;
               *this provide the user amaizing service;
               */}
              <Route path='/uploadSong' element={<UploadSong />} />
              <Route path='*' element={<Navigate to="/home" />} />
            </Routes>
          ) : (
            //logged out routes;;;;;;;;;;;
            <Routes>

              {/*Adding routes component here */}
              {/*Path and Rendering */}
              <Route path="/home" element={<HomeComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/signup" element={<SignupComponent />} />
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
