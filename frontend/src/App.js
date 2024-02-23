import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Home from './components/Home'
import Edit from "./components/Edit";
import Nofound from "./components/Nofound";
function App() {
  return <div>
    <Router>
      <Routes>
        <Route path="/" element={<Signup />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/editdata" element={<Edit />} />
        <Route path="*" element={<Nofound />} />
      </Routes>
    </Router>
  </div>;
}

export default App;
