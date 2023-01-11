import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import TakeOrder from './screens/takeOrder';
import MainScreen from './screens/mainScreen';
import Header from './screens/header';
import CknContext from './contexts/cknContext';

function App() {
  return (
    <div className="App ">
    <CknContext>
    <MainScreen></MainScreen>
    </CknContext>
    </div>
  );
}

export default App;
