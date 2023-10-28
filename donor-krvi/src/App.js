import logo from './logo.svg';
import './App.css';
import Footer from './components/footer';
import Karta from './components/karta';
import Navbar from './components/navBar';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Karta />
      <Footer />
    </div>
  );
}

export default App;