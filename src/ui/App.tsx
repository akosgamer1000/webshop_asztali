
import './App.css';
import Router from './router';

function App() {
  return (
    <>
      <nav>
        <a href="#/">Home</a>
        <a href="#/about">About</a>
        <a href="#/contact">Contact</a>
      </nav>
      <Router />
    </>
  );
}

export default App;
