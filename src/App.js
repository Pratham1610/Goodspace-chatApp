import './App.css';
import Intro from './components/intro';
import Nav from './components/nav';
import RegForm from './components/regform';

function App() {
  return (
    <>
      <Nav />
      <div className='flex'>
      <div className="flex-1">
        <Intro />
      </div>
      <div className="flex-1 mt-16 ml-2 mr-5">
        <RegForm />
      </div>
      </div>
    </>
  );
}

export default App;
