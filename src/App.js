import React,{ useState } from 'react';
import './App.css';
import Intro from './components/intro';
import Nav from './components/nav';
import RegForm from './components/regform';
import Page2 from './components/page2';

function App() {
  const [showpage2, setShowPage2] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('./components/images/background.jpg'); // Provide the default background image path

  const handleSubmit = () => {
    console.log("submit is clicked");
    setShowPage2(true);
    setBackgroundImage('./components/images/bg2.jpg');
  }
  return (
    <>
    <div className='App'style={{ backgroundImage: `url(${backgroundImage})` }}>
    <Nav />
    <div className='flex'>
    <div className="flex-1">
    {!showpage2 ? (
            <Intro />
          ) : (
            <Page2 />
          )}
    </div>
    <div className="flex-1 mt-16 ml-2 mr-5">
    {!showpage2 && (
          <div className="flex-1">
            <RegForm onSubmit={handleSubmit} />
          </div>
        )}
    </div>
    </div>
    </div>
    </>
  );
}

export default App;
