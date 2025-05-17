import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './screens/Login';
import { CartProvider } from './components/ContextReducer';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import Signup from './screens/Signup';
import MyOrder from './screens/MyOrder';

function App() {
  return (
    <>
      <div>
        <CartProvider>
          <Router>
            <div>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/createuser" element={<Signup />} />
                <Route exact path="/myorderdata" element={<MyOrder />} />
              </Routes>
            </div>
          </Router>
        </CartProvider>

      </div>
    </>
  );
}

export default App;