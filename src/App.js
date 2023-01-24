import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import ItemCard from "./components/Item Card";
import NavBar from "./components/NavBar";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import AddWagyu from "./components/Add Wagyu";
import AddManu from "./components/Add Manu";
import "./styles/App.css"
import "./styles/variables.css"

function App() {
  return (
    <div className="container">
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/navbar" element={<NavBar/>} />
            <Route path="/itemcard" element={<ItemCard/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register/:role" element={<Register/>} />
            <Route path="/profile" element={
              <PrivateRoute roles={[""]}><Profile/></PrivateRoute>
            } />
            <Route path="/addwagyu" element={<AddWagyu/>} />
            <Route path="/addmanu" element={<AddManu/>} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
