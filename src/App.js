
import './output.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from './routes/Login';
import SignupComponent from './routes/Signup';
import HomeComponent from './routes/Home';

function App() {
  return (

    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        <Routes>
          {/*Adding routes component here */}
          {/*Path and Rendering */}
          <Route path="/" element={<HelloComp />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/home" element={<HomeComponent />} />

        </Routes>
      </BrowserRouter>

    </div>

  );

};

const HelloComp = () => {
  return <div>This is hello component</div>;
}

export default App; 
